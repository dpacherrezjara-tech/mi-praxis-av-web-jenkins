Ext.define('Ext.Praxis.controller.payments.ProcessLogger.ProcessDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessDataEntryController',
    url: CONTEXTPATH + '/ProcessLog',

    // Usado solo por PRO (provision) — /AccountingReport/executeProvision
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 0
    }),

    // Proxy hacia el monolito: F2, DB, OP
    monolithRequest: axios.create({
        baseURL: CONTEXTPATH + '/Monolith',
        timeout: 120000
    }),

    notifier: new AWN(),

    init: function (view) {},

    afterRender: async function () {
        const me = this;
        const cmbProcesadores = Ext.getCmp(prototype.idProcess + '-cmbCODPRO');
        global.setComboStore(cmbProcesadores, me.view.procesadores, 'CODE', 'NAME', '');
    },

    onChangeProcess: function (btn) {
        const f2Filters  = Ext.getCmp(prototype.idProcess + '-formF2');
        const dbFilters  = Ext.getCmp(prototype.idProcess + '-formDB');
        const proFilters = Ext.getCmp(prototype.idProcess + '-formPRO');
        const poFilters  = Ext.getCmp(prototype.idProcess + '-formPO');
        f2Filters.hide();
        dbFilters.hide();
        proFilters.hide();
        poFilters.hide();

        switch (btn.value) {
            case 'F2':  f2Filters.show();  break;
            case 'DB':  dbFilters.show();  break;
            case 'PRO': proFilters.show(); break;
            case 'OP':  poFilters.show();  break;
        }
    },

    onProcessClick: async function () {
        const me     = this;
        const filter = Ext.getCmp(prototype.idProcess + '-processType');
        const notifier = new AWN();
        const onOk = () => {
            switch (filter.value) {
                case 'F2':  me.processF2();  break;
                case 'DB':  me.processDB();  break;
                case 'PRO': me.processPRO(); break;
                case 'OP':  me.processPO();  break;
            }
        };
        notifier.confirm('Are you sure to Process?', onOk, null);
    },

    // ─── F2 — Procesador Exterior → POST /Monolith/generateFase2 ────────────────
    // Payload: { CCUST, CODPRO, TIPO, FECR, VALDATEF, VALDATET, USERNAME }
    processF2: async function () {
        const me       = this;
        const notifier = new AWN();
        const usuario  = document.getElementById('menuUser').innerText;
        const filters  = Object.assign({}, Ext.getCmp(prototype.idProcess + '-formF2').getForm().getValues());

        // Validación de permisos (igual que antes)
        let permission = true;
        if (!me.view.admins.some(x => x.USERNAME === usuario)) {
            if (filters.IN_CCUST === 'ALL') permission = false;
            if (filters.IN_CODPRO === '')   permission = false;
        }
        if (!permission) {
            notifier.alert('User not allowed');
            return;
        }

        const isTipo2 = filters.IN_TIPO === '2';
        const payload = {
            CCUST:    filters.IN_CCUST,
            CODPRO:   filters.IN_CODPRO === '' ? 'ALL' : filters.IN_CODPRO,
            TIPO:     filters.IN_TIPO,
            FECR:     isTipo2 ? '' : Ext.Date.format(new Date(), 'Ymd'),
            VALDATEF: isTipo2 ? (filters.IN_VALDATEF || '') : '',
            VALDATET: isTipo2 ? (filters.IN_VALDATET || '') : '',
            USERNAME: usuario.trim()
        };

        me.view.setLoading(true);
        try {
            const res  = await me.monolithRequest.post('/generateFase2', payload);
            const data = res.data;
            if (data && data.success === true) {
                notifier.success(data.message || 'Proceso iniciado correctamente');
                me.view.close();
            } else {
                notifier.alert((data && data.message) ? data.message : 'Error al ejecutar el proceso');
            }
        } catch (e) {
            notifier.alert('Error: ' + (e.message || 'Error al ejecutar el proceso'));
        } finally {
            if (!me.view.isDestroyed) me.view.setLoading(false);
        }
    },

    // ─── DB — Generar Débitos → POST /Monolith/generateDebitos ─────────────────
    // Payload: { CCUST, USERNAME }
    processDB: async function () {
        const me       = this;
        const notifier = new AWN();
        const usuario  = document.getElementById('menuUser').innerText;
        const filters  = Ext.getCmp(prototype.idProcess + '-formDB').getForm().getValues();

        const payload = {
            CCUST:    filters.IN_CCUST,
            USERNAME: usuario.trim()
        };

        me.view.setLoading(true);
        try {
            const res  = await me.monolithRequest.post('/generateDebitos', payload);
            const data = res.data;
            if (data && data.success === true) {
                notifier.success(data.message || 'Proceso iniciado correctamente');
                me.view.close();
            } else {
                notifier.alert((data && data.message) ? data.message : 'Error al ejecutar el proceso');
            }
        } catch (e) {
            notifier.alert('Error: ' + (e.message || 'Error al ejecutar el proceso'));
        } finally {
            if (!me.view.isDestroyed) me.view.setLoading(false);
        }
    },

    // ─── PRO — Provision (sin cambios) ──────────────────────────────────────────
    processPRO: async function () {
        const me       = this;
        const notifier = new AWN();
        const form     = Ext.getCmp(prototype.idProcess + '-formPRO');

        if (form.isValid()) {
            form.setLoading(true);
            const file     = Ext.getCmp(prototype.idProcess + '-fileProvision').fileInputEl.dom.files[0];
            const nameFile = file.name;

            global.readExcelFile(file, async (json) => {
                try {
                    if (!json || json.length === 0) {
                        notifier.alert('File has no data rows');
                        return;
                    }

                    const requiredHeaders = ['ACTION', 'REFER', 'VALDATE'];
                    const fileHeaders     = Object.keys(json[0]);
                    const missingHeaders  = requiredHeaders.filter(h => !fileHeaders.includes(h));
                    if (missingHeaders.length > 0) {
                        notifier.alert('Missing columns: ' + missingHeaders.join(', '));
                        return;
                    }

                    const validActions = ['P', 'U', 'B'];
                    const invalidRows  = json
                        .map((row, i) => ({ row: i + 2, action: row.ACTION }))
                        .filter(x => !validActions.includes(String(x.action).trim().toUpperCase()));
                    if (invalidRows.length > 0) {
                        notifier.alert(
                            'Invalid ACTION values at rows: ' + invalidRows.map(x => x.row).join(', ') +
                            '<br>Allowed: P, U, B'
                        );
                        return;
                    }

                    const emptyRows = json
                        .map((row, i) => ({ row: i + 2, refer: row.REFER, valdate: row.VALDATE }))
                        .filter(x => !x.refer || String(x.refer).trim() === '' ||
                                     !x.valdate || String(x.valdate).trim() === '');
                    if (emptyRows.length > 0) {
                        notifier.alert('Empty REFER or VALDATE at rows: ' + emptyRows.map(x => x.row).join(', '));
                        return;
                    }

                    json = json.map(x => ({ FILENAM: nameFile, ...x }));

                    const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', json);
                    const res = await me.request.post('/executeProvision', {
                        IN_CUUID: tmp.cuuid,
                        IN_FUUID: tmp.fuuid
                    });

                    const data = res.data;
                    if (data && data.STATUS === true) {
                        notifier.success('Provision Started');
                    } else {
                        notifier.alert('Provision Failed');
                    }
                } catch (e) {
                    console.error(e);
                    notifier.alert('Error on process');
                } finally {
                    form.setLoading(false);
                }
            });
        } else {
            notifier.alert('Select file');
        }
    },

    // ─── OP — Conciliación Operativa → POST /Monolith/generateFaseope ───────────
    // Payload: { CCUST, CODPRO, USERNAME }
    processPO: async function () {
        const me       = this;
        const notifier = new AWN();
        const usuario  = document.getElementById('menuUser').innerText;
        const filters  = Ext.getCmp(prototype.idProcess + '-formPO').getForm().getValues();

        const payload = {
            CCUST:    filters.IN_CCUST,
            CODPRO:   filters.IN_CODPRO,
            USERNAME: usuario.trim()
        };

        me.view.setLoading(true);
        try {
            const res  = await me.monolithRequest.post('/generateFaseope', payload);
            const data = res.data;
            if (data && data.success === true) {
                notifier.success(data.message || 'Proceso iniciado correctamente');
                me.view.close();
            } else {
                notifier.alert((data && data.message) ? data.message : 'Error al ejecutar el proceso');
            }
        } catch (e) {
            notifier.alert('Error: ' + (e.message || 'Error al ejecutar el proceso'));
        } finally {
            if (!me.view.isDestroyed) me.view.setLoading(false);
        }
    },

    onChangeTypeProcessF2: function (btn) {
        const valueDates = Ext.getCmp(prototype.idProcess + '-valueDatesF2');
        valueDates.hide();
        if (btn.value === '2') {
            valueDates.show();
        }
    },

    onClose: function () {
        this.view.close();
    }
});
