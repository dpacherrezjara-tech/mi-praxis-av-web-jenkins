Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.ProcessAccountingDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessAccountingDataEntryController',

    request: axios.create({
        baseURL: CONTEXTPATH + '/Monolith',
        timeout: 60000
    }),

    // Opciones de Acc. Type según proceso (mirrors RunModal)
    _ACC_TYPE_TC: [
        ['REG', 'Regular'], ['DEB', 'Débito'], ['ADJ', 'Ajustes'],
        ['SAL', 'Venta sin Pago'], ['ADM', 'Debit Memo'], ['REV', 'Reversa']
    ],
    _ACC_TYPE_CASH: [
        ['REG', 'Regular']
    ],

    // ── Lifecycle ─────────────────────────────────────────────────────────────

    afterRender: function () {
        const me = this;
        me._procesadores = Object.assign([], me.getView().procesadores);
        // Estado inicial: TC + REG → negoc editable
        me._updateNegocState('TC', 'REG');
        me._refreshProcessors();
    },

    // ── Cambio de Process type ────────────────────────────────────────────────

    onChangeProcType: function (combo, newVal) {
        if (!newVal) return;
        const me = this;
        const view = me.getView();
        const W = view.id;

        const cmbTipocon = Ext.getCmp(W + '-cmbTIPOCON');
        const cmbCcust = Ext.getCmp(W + '-cmbCcust');
        const cmbProc = Ext.getCmp(W + '-cmbCODPRO');

        // 1. Actualizar opciones de Acc. Type según proceso
        const accData = newVal === 'TC' ? me._ACC_TYPE_TC : me._ACC_TYPE_CASH;
        cmbTipocon.setStore(Ext.create('Ext.data.SimpleStore', {
            fields: ['code', 'name'],
            data: accData
        }));

        // 2. CASH fuerza REG; TC deja el valor actual si es válido, sino REG
        const currentAcc = cmbTipocon.getValue();
        const nextAcc = newVal === 'CASH'
            ? 'REG'
            : (me._ACC_TYPE_TC.some(function (x) { return x[0] === currentAcc; }) ? currentAcc : 'REG');

        cmbTipocon.suspendEvents();
        cmbTipocon.setValue(nextAcc);
        cmbTipocon.resumeEvents();

        // 3. Limpiar cliente y procesador (mirrors: client:"", processor:"")
        cmbCcust.suspendEvents();
        cmbCcust.setValue(null);
        cmbCcust.resumeEvents();

        cmbProc.suspendEvents();
        cmbProc.setValue(null);
        cmbProc.resumeEvents();

        // 4. Actualizar NEGOC + procesadores
        me._updateNegocState(newVal, nextAcc);
        me._refreshProcessors();
    },

    // ── Cambio de Client ──────────────────────────────────────────────────────

    onChangeCcust: function () {
        const me = this;
        const view = me.getView();
        // mirrors: client change → processor:""
        Ext.getCmp(view.id + '-cmbCODPRO').setValue(null);
        me._refreshProcessors();
    },

    // ── Cambio de Acc. Type ───────────────────────────────────────────────────

    onChangeTipocon: function (combo, newVal) {
        if (!newVal) return;
        const me = this;
        const view = me.getView();
        const W = view.id;
        const procType = Ext.getCmp(W + '-cmbProcType').getValue();

        // mirrors: accType change → processor:"", negoc reset if not TC+REG
        Ext.getCmp(W + '-cmbCODPRO').setValue(null);
        me._updateNegocState(procType, newVal);
        me._refreshProcessors();
    },

    // ── Cambio de fecha From → sincroniza To (mirrors: fromDate change → toDate=fromDate) ──

    onChangeFromDate: function (field, newVal) {
        const me = this;
        const dateTo = Ext.getCmp(me.getView().id + '-dateTo');
        if (newVal && dateTo) {
            dateTo.suspendEvents();
            dateTo.setValue(newVal);
            dateTo.resumeEvents();
        }
    },

    // ── Helpers internos ──────────────────────────────────────────────────────

    // mirrors: isNegocEditable = procType==='TC' && accType==='REG'
    _updateNegocState: function (procType, accType) {
        const cmbNegoc = Ext.getCmp(this.getView().id + '-cmbNegoc');
        if (!cmbNegoc) return;
        const editable = procType === 'TC' && accType === 'REG';
        cmbNegoc.setReadOnly(!editable);
        if (!editable) {
            cmbNegoc.suspendEvents();
            cmbNegoc.setValue('1');
            cmbNegoc.resumeEvents();
        }
    },

    // Filtra procesadores por proceso+cliente+tipocon (mirrors syncRunOptions → runProcessorOptions)
    _refreshProcessors: function () {
        const me = this;
        const W = me.getView().id;
        const procType = (Ext.getCmp(W + '-cmbProcType').getValue() || '').trim();
        const ccust = (Ext.getCmp(W + '-cmbCcust').getValue() || '').trim();
        const tipocon = (Ext.getCmp(W + '-cmbTIPOCON').getValue() || '').trim();

        const data = me._procesadores.filter(function (x) {
            return (x.PROC_TYPE || '').trim() === procType &&
                (x.CLIENTE || '').trim() === ccust &&
                (x.ACC_TYPE || '').trim() === tipocon;
        });

        data.sort(function (a, b) {
            return (a.PROC_DESC || '').localeCompare(b.PROC_DESC || '');
        });

        const cmbProc = Ext.getCmp(W + '-cmbCODPRO');
        cmbProc.suspendEvents();
        cmbProc.getStore().loadData(data);
        cmbProc.setValue(null);
        cmbProc.resumeEvents();
    },

    // mirrors: validateDates + required-fields check
    _validateForm: function () {
        const W = this.getView().id;
        const procType = Ext.getCmp(W + '-cmbProcType').getValue();
        const ccust = Ext.getCmp(W + '-cmbCcust').getValue();
        const tipocon = Ext.getCmp(W + '-cmbTIPOCON').getValue();
        const negoc = Ext.getCmp(W + '-cmbNegoc').getValue();
        const codpro = Ext.getCmp(W + '-cmbCODPRO').getValue();
        const dateFrom = Ext.getCmp(W + '-dateFrom').getValue();
        const dateTo = Ext.getCmp(W + '-dateTo').getValue();

        if (!procType) return 'El campo Process es obligatorio';
        if (!ccust) return 'El campo Client es obligatorio';
        if (!tipocon) return 'El campo Acc. Type es obligatorio';
        if (!negoc) return 'El campo Business es obligatorio';
        // mirrors: processorRequired = procType !== 'CASH'
        if (procType !== 'CASH' && !codpro) return 'El campo Processor es obligatorio para Credit Card';
        if (!dateFrom || !dateTo) return 'Las fechas From y To son obligatorias';
        if (dateFrom > dateTo) return 'La fecha From no puede ser mayor que To';
        return null;
    },

    _formatDate: function (d) {
        return d ? Ext.Date.format(d, 'Ymd') : '';
    },

    // mirrors: mapQueryPayload
    _buildQueryPayload: function () {
        const W = this.getView().id;
        return {
            PROC_TYPE: Ext.getCmp(W + '-cmbProcType').getValue() || '',
            CCUST: Ext.getCmp(W + '-cmbCcust').getValue() || '',
            ACC_TYPE: Ext.getCmp(W + '-cmbTIPOCON').getValue() || '',
            CODPRO: Ext.getCmp(W + '-cmbCODPRO').getValue() || '',
            NEGOC: Ext.getCmp(W + '-cmbNegoc').getValue() || '',
            FROM_DATE: this._formatDate(Ext.getCmp(W + '-dateFrom').getValue()),
            TO_DATE: this._formatDate(Ext.getCmp(W + '-dateTo').getValue())
        };
    },

    // ── Paso 1: Consultar Pendientes ──────────────────────────────────────────

    onQueryClick: async function () {
        const me = this;
        const view = me.getView();

        const error = me._validateForm();
        if (error) { new AWN().warning(error); return; }

        const queryBtn = view.down('#btn-query');
        if (queryBtn) queryBtn.setDisabled(true);
        view.mask('Consultando registros pendientes...');

        try {
            const payload = me._buildQueryPayload();
            const res = await me.request.post('getPendingRecords', payload);
            const data = res && res.data;
            console.log(data);

            if (!data || !data.success) {
                throw new Error((data && data.message) || 'Error al consultar registros pendientes');
            }

            const records = data.records || [];

            if (records.length === 0) {
                new AWN().warning('No se encontraron registros pendientes con los parámetros indicados');
                return;
            }

            me._switchToPreview(records, payload);

        } catch (e) {
            new AWN().alert((e && e.message) || 'Error al consultar registros pendientes');
        } finally {
            view.unmask();
            const btn = view.down('#btn-query');
            if (btn) btn.setDisabled(false);
        }
    },

    _switchToPreview: function (records, payload) {
        const me = this;
        const view = me.getView();
        const W = view.id;

        // Cargar grilla — defer selectAll para que el view procese los records primero
        const grid = view.down('#grid-pending');
        grid.getStore().loadData(records);
        Ext.defer(function () {
            if (grid && !grid.isDestroyed) {
                grid.getSelectionModel().selectAll();
                me._updateSelCount();
            }
        }, 50);

        // Actualizar summary bar (mirrors el header de RunPreview)
        const procLabel = payload.PROC_TYPE === 'TC' ? 'Credit Card' : 'Cash';
        const el = document.getElementById(W + '-summaryContent');
        if (el) {
            el.innerHTML =
                '<b>' + procLabel + '</b>' +
                ' &nbsp;|&nbsp; Client: <b>' + payload.CCUST + '</b>' +
                ' &nbsp;|&nbsp; Type: <b>' + payload.ACC_TYPE + '</b>' +
                (payload.CODPRO ? ' &nbsp;|&nbsp; Proc: <b>' + payload.CODPRO + '</b>' : '') +
                ' &nbsp;|&nbsp; NEGOC: <b>' + payload.NEGOC + '</b>' +
                ' &nbsp;|&nbsp; ' + payload.FROM_DATE + ' → ' + payload.TO_DATE +
                ' &nbsp;|&nbsp; <span style="color:#5bc611;font-weight:bold;">' + records.length + ' registro(s)</span>';
        }

        // Sincronizar fecha contable con la fecha actual
        const dateFcont = Ext.getCmp(W + '-dateFcont');
        if (dateFcont && !dateFcont.getValue()) dateFcont.setValue(new Date());

        // Cambiar título de la ventana
        view.setTitle('Revisar y Generar');

        // Activar card de preview (índice 1)
        view.down('[itemId=card-layout]').getLayout().setActiveItem(1);

        // Redimensionar ventana (mirrors modalWidth = 1020 en preview)
        view.setSize(800, 490);
        view.center();

        // Alternar botones
        view.down('#btn-query').hide();
        view.down('#btn-generate').show();
        view.down('#btn-back').show();

        me._updateSelCount();
    },

    // ── Selección de grilla ───────────────────────────────────────────────────

    onSelectAll: function () {
        const view = this.getView();
        view.down('#grid-pending').getSelectionModel().selectAll();
        this._updateSelCount();
    },

    onDeselectAll: function () {
        const view = this.getView();
        view.down('#grid-pending').getSelectionModel().deselectAll();
        this._updateSelCount();
    },

    onSelectionChange: function () {
        this._updateSelCount();
    },

    onFcontChange: function () {
        this._updateSelCount();
    },

    _updateSelCount: function () {
        const view = this.getView();
        const W = view.id;
        const sel = view.down('#grid-pending').getSelectionModel().getSelection();
        const count = sel.length;

        const lbl = Ext.getCmp(W + '-selCountLabel');
        if (lbl) lbl.setText(count + ' seleccionado(s)');

        // mirrors: canGenerate = selectedRows.length > 0 && Boolean(fcont)
        const fcont = Ext.getCmp(W + '-dateFcont');
        const genBtn = view.down('#btn-generate');
        if (genBtn) genBtn.setDisabled(count === 0 || !fcont || !fcont.getValue());
    },

    // ── Paso 2: Generar ───────────────────────────────────────────────────────

    onGenerateClick: function () {
        const me = this;
        const view = me.getView();
        const W = view.id;
        const grid = view.down('#grid-pending');
        const sel = grid.getSelectionModel().getSelection();

        if (sel.length === 0) {
            new AWN().warning('Debes seleccionar al menos un registro');
            return;
        }

        const fcont = Ext.getCmp(W + '-dateFcont').getValue();
        if (!fcont) {
            new AWN().warning('La fecha contable (Accounting Date) es obligatoria');
            return;
        }

        const toDate = Ext.getCmp(W + '-dateTo') && Ext.getCmp(W + '-dateTo').getValue();
        if (toDate && fcont < toDate) {
            new AWN().warning('La fecha contable no puede ser menor que la fecha TO del período ('
                + Ext.Date.format(toDate, 'Ymd') + ')');
            return;
        }

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to generate accounting for <b>' + sel.length + '</b> record(s)?<br>'
                + '<span style="color:#c82d2d;">This action cannot be undone.</span>',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') me._executeGenerate(sel, fcont);
            }
        });
        Ext.Msg.toFront();
    },

    // mirrors: handleSubmit → ejecutarContabilidad('/generate_accounting', mapGeneratePayload)
    _executeGenerate: async function (selected, fcont) {
        const me = this;
        const view = me.getView();

        const rows = selected.map(function (r) { return r.getData(); });
        const payload = Ext.apply({}, me._buildQueryPayload(), {
            FCONT: me._formatDate(fcont),
            rows: rows
        });

        view.mask('Generando contabilidad...');
        const genBtn = view.down('#btn-generate');
        if (genBtn) genBtn.setDisabled(true);

        try {
            const res = await me.request.post('generateAccounting', payload);
            const data = res && res.data;

            if (!data || !data.success) {
                throw new Error((data && data.message) || 'Error al ejecutar la generación');
            }

            new AWN().success((data && data.message) || 'Proceso iniciado correctamente');
            if (Ext.isFunction(view.onAfterAction)) view.onAfterAction();
            view.destroy();

        } catch (e) {
            new AWN().alert((e && e.message) || 'Error al ejecutar la generación');
            if (genBtn) genBtn.setDisabled(false);
        } finally {
            view.unmask();
        }
    },

    // ── Navegación ────────────────────────────────────────────────────────────

    onBackClick: function () {
        const view = this.getView();
        view.down('[itemId=card-layout]').getLayout().setActiveItem(0);
        view.setTitle('Ejecutar Contabilidad');
        view.setSize(550, 260);
        view.center();
        view.down('#btn-query').show();
        view.down('#btn-generate').hide();
        view.down('#btn-back').hide();
    },

    onCancelClick: function () {
        this.getView().destroy();
    }
});
