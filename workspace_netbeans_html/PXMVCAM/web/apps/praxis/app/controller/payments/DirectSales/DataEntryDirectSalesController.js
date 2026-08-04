Ext.define('Ext.Praxis.controller.payments.DirectSales.DataEntryDirectSalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDirectSalesController',

    init: function (view) {
    },
    afterRender: function () {
        this.p = this.view.params;
        this.action = this.p.action || 'U';

        this.bindCountryStore();
        this.bindCurrencyStore();

        if (this.action === 'C') {
            this.setupCreateMode();
        } else {
            this.getDataInputs(this.p.rec);
            this.loadVoucher(this.p.rec);
        }
    },
    // El combo de Scountry usa la misma lista de países ya cargada por
    // DirectSalesController (me.lstCountry, vía /obtainData), sin pedirla de nuevo.
    bindCountryStore: function () {
        if (typeof me === 'undefined' || !me.lstCountry) {
            return;
        }
        var store = Ext.create('Ext.data.Store', {
            fields: ['A006PAIS', 'A006NOMBRE'],
            data: me.lstCountry,
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-deSCOUNTRY').bindStore(store);
    },
    // Igual que con países: reutiliza me.lstCurrencies (también vía
    // /obtainData). Se descarta la opción "All" (A005KEY vacío) porque un
    // registro necesita sí o sí una moneda concreta.
    bindCurrencyStore: function () {
        if (typeof me === 'undefined' || !me.lstCurrencies) {
            return;
        }
        var data = Ext.Array.filter(me.lstCurrencies, function (item) {
            return item.A005KEY !== '';
        });
        var store = Ext.create('Ext.data.Store', {
            fields: ['A005KEY', 'A005KEY2'],
            data: data,
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-deSCURRENCY').bindStore(store);
    },
    // Ccust, Scountry y Scurrency son combos (setDisabled); Sagent es
    // textfield (setReadOnly). Adate no entra aquí: siempre es editable (ver
    // DataEntry.js), tanto al crear como al actualizar. Treg, Cbatch y Seq
    // tampoco entran: son siempre de solo lectura en cualquier modo (Treg
    // fija en 'H'; Cbatch/Seq se generan en el servidor, ver MPS781).
    setKeyFieldsReadOnly: function (readOnly) {
        var comboIds = ['-deCCUST', '-deSCOUNTRY', '-deSCURRENCY'];
        Ext.Array.each(comboIds, function (suffix) {
            Ext.getCmp(prototype.id + suffix).setDisabled(readOnly);
        });

        Ext.getCmp(prototype.id + '-deSAGENT').setReadOnly(readOnly);
    },
    setupCreateMode: function () {
        // MPS781: crea un registro nuevo en MPF190. Solo se piden los mismos
        // campos que ya se ven en el DataEntry de edición (incluyendo la
        // llave completa, ya que no hay un registro previo del cual heredarla).
        // Cbatch y Seq NO los llena el usuario: MPS781 los genera (Cbatch vía
        // CASH_CBATCH, Seq contando registros existentes para Ccust+Sagent+Sdate).
        this.view.setTitle('Direct Sales Detail - New');
        Ext.getCmp(prototype.id + '-deBtnUpdate').setText('Create');

        this.setKeyFieldsReadOnly(false);

        var ids = ['-deCCUST', '-deADATE', '-deSCOUNTRY', '-deSAGENT', '-deSCURRENCY',
            '-deCBATCH', '-deSEQ', '-deNETO', '-dePAYAMOU', '-deSDATE',
            '-deREFERENCE', '-deSFILE', '-deNPAG', '-deCOMMENTS',
            '-deUSCR', '-deFECR', '-deHOCR', '-dePGMCR', '-deUSUP', '-deFEUP', '-deHOUP', '-dePGMUP'];
        Ext.Array.each(ids, function (suffix) {
            Ext.getCmp(prototype.id + suffix).setValue('');
        });

        // Treg siempre es 'H' al crear (registro tipo Header) y nunca se edita.
        Ext.getCmp(prototype.id + '-deTREG').setValue('H');

        // Todavía no existe conciliación para un registro recién creado: se
        // fuerza a Pendiente y se bloquea el combo (no se puede modificar).
        Ext.getCmp(prototype.id + '-deSTVAL').setValue('3');
        Ext.getCmp(prototype.id + '-deSTVAL').setDisabled(true);

        var adateCmp = Ext.getCmp(prototype.id + '-deADATE');
        var sdateCmp = Ext.getCmp(prototype.id + '-deSDATE');
        if (adateCmp.inputEl) {
            adateCmp.inputEl.setStyle('background-color', '');
        }
        if (sdateCmp.inputEl) {
            sdateCmp.inputEl.setStyle('background-color', '');
        }

        // Al crear todavía no hay ningún archivo/voucher que mostrar: se oculta
        // el panel del PDF y se achica la ventana (angosto + bajo) para no
        // dejar espacio vacío de sobra.
        Ext.getCmp(prototype.id + '-deVoucherPanel').setVisible(false);
        this.view.setWidth(990);
        this.view.setHeight(570);
        this.view.center();
    },
    getDataInputs: function (rec) {
        // ADATE es editable a pesar de ser parte de la llave: se guarda el
        // valor original (antes de cualquier edición) para poder ubicar el
        // registro correcto al momento de actualizar (ver doUpdate). El resto
        // de la llave sí se bloquea, ya que solo se puede tocar al crear.
        this.originalADATE = rec.get('ADATE');
        this.setKeyFieldsReadOnly(true);

        Ext.getCmp(prototype.id + '-deCCUST').setValue(rec.get('CCUST'));
        Ext.getCmp(prototype.id + '-deTREG').setValue(rec.get('TREG'));
        Ext.getCmp(prototype.id + '-deADATE').setValue(rec.get('ADATE'));
        Ext.getCmp(prototype.id + '-deSCOUNTRY').setValue(rec.get('SCOUNTRY'));
        Ext.getCmp(prototype.id + '-deSAGENT').setValue(rec.get('SAGENT'));
        Ext.getCmp(prototype.id + '-deSCURRENCY').setValue(rec.get('SCURRENCY'));
        Ext.getCmp(prototype.id + '-deCBATCH').setValue(rec.get('CBATCH'));
        Ext.getCmp(prototype.id + '-deSEQ').setValue(rec.get('SEQ'));

        // El status NUNCA se puede modificar desde el DataEntry (solo lo
        // cambia la conciliación, MPS320): el combo se muestra deshabilitado,
        // solo para lectura del valor actual.
        Ext.getCmp(prototype.id + '-deSTVAL').setDisabled(true);
        Ext.getCmp(prototype.id + '-deSTVAL').setValue(rec.get('STVAL'));

        // Se muestran como texto plano (sin separador de miles) porque, al
        // editarse, ese mismo texto es lo que se enviará al servidor.
        Ext.getCmp(prototype.id + '-deNETO').setValue(rec.get('NETO'));
        Ext.getCmp(prototype.id + '-dePAYAMOU').setValue(rec.get('PAYAMOU'));

        Ext.getCmp(prototype.id + '-deSDATE').setValue(rec.get('SDATE'));

        // Abono Date no debería ser anterior a la Sales Date: si pasa, se
        // pintan ambos campos de amarillo para que el usuario lo note.
        var adateCmp = Ext.getCmp(prototype.id + '-deADATE');
        var sdateCmp = Ext.getCmp(prototype.id + '-deSDATE');
        var isDateMismatch = rec.get('ADATE') && rec.get('SDATE') && rec.get('ADATE') < rec.get('SDATE');
        var mismatchColor = isDateMismatch ? '#FFF176' : '';
        if (adateCmp.inputEl) {
            adateCmp.inputEl.setStyle('background-color', mismatchColor);
        }
        if (sdateCmp.inputEl) {
            sdateCmp.inputEl.setStyle('background-color', mismatchColor);
        }

        Ext.getCmp(prototype.id + '-deREFERENCE').setValue(rec.get('REFERENCE'));
        Ext.getCmp(prototype.id + '-deSFILE').setValue(rec.get('SFILE'));
        Ext.getCmp(prototype.id + '-deNPAG').setValue(rec.get('NPAG'));
        Ext.getCmp(prototype.id + '-deCOMMENTS').setValue(rec.get('COMMENTS'));

        Ext.getCmp(prototype.id + '-deUSCR').setValue(rec.get('USCR'));
        Ext.getCmp(prototype.id + '-deFECR').setValue(rec.get('FECR'));
        Ext.getCmp(prototype.id + '-deHOCR').setValue(rec.get('HOCR'));
        Ext.getCmp(prototype.id + '-dePGMCR').setValue(rec.get('PGMCR'));

        Ext.getCmp(prototype.id + '-deUSUP').setValue(rec.get('USUP'));
        Ext.getCmp(prototype.id + '-deFEUP').setValue(rec.get('FEUP'));
        Ext.getCmp(prototype.id + '-deHOUP').setValue(rec.get('HOUP'));
        Ext.getCmp(prototype.id + '-dePGMUP').setValue(rec.get('PGMUP'));
    },
    loadVoucher: function (rec) {
        var sfile = rec.get('SFILE');
        var sagent = rec.get('SAGENT');
        // Se usa SDATE (Sales Date), no ADATE (Abono Date): el nombre del
        // archivo real en la carpeta se arma con la fecha de venta, y ADATE
        // puede venir mal cargada (ver caso 76990163 con ADATE=2016 siendo
        // que el archivo real está en la carpeta 2026).
        var sdate = rec.get('SDATE');
        var npag = rec.get('NPAG');

        console.log('loadVoucher -> SFILE=[' + sfile + '] SAGENT=[' + sagent + '] SDATE=[' + sdate + '] NPAG=[' + npag + ']');

        var iframe = document.getElementById('pdfIframeVoucherDS');
        if (!iframe) {
            console.log('loadVoucher -> no se encontró el iframe #pdfIframeVoucherDS en el DOM.');
            return;
        }

        if (!sfile || !sagent || !sdate) {
            console.log('loadVoucher -> falta SFILE, SAGENT o SDATE en el registro, no se pide el voucher.');
            return;
        }

        var year = sdate.toString().substring(0, 4);

        var targetPage = parseInt(npag, 10);
        var pageHash = (!isNaN(targetPage) && targetPage > 0) ? ('#page=' + targetPage) : '';

        // El endpoint decide del lado del servidor si sirve .pdf, .png o el archivo
        // original, según lo que realmente exista en la carpeta. Se manda también
        // sdate para que, si SFILE no calza por nombre (tildes corruptas al guardarse
        // en la base), busque por prefijo "sagent_sdate" en la carpeta.
        var url = prototype.url + '/downloadVoucher' +
                '?sfile=' + encodeURIComponent(sfile) +
                '&sagent=' + encodeURIComponent(sagent) +
                '&year=' + encodeURIComponent(year) +
                '&sdate=' + encodeURIComponent(sdate) +
                '&disposition=inline' + pageHash;

        console.log('loadVoucher -> url=' + url);

        iframe.src = url;
    },
    // Sales Date es obligatoria en ambos modos (crear y actualizar). Los
    // campos marcados con (*) que sí llena el usuario (Treg, Cbatch y Seq
    // quedan afuera: son de solo lectura/autogenerados) solo se validan al
    // crear, ya que al actualizar ya vienen llenos del registro existente.
    // cmp.isValid() ya pinta el campo en rojo.
    validateRequiredFields: function () {
        var ids = ['-deSDATE'];
        if (this.action === 'C') {
            ids = ids.concat(['-deCCUST', '-deADATE', '-deSCOUNTRY', '-deSAGENT', '-deSCURRENCY']);
        }
        var valid = true;
        Ext.Array.each(ids, function (suffix) {
            if (!Ext.getCmp(prototype.id + suffix).isValid()) {
                valid = false;
            }
        });
        if (!valid) {
            global.Msg({msg: 'Debe completar correctamente los campos marcados con (*) y Sales Date (8 dígitos numéricos).'});
        }
        return valid;
    },
    onUpdateClick: function (btn) {
        var self = this;

        if (!self.validateRequiredFields()) {
            return;
        }

        var msg = self.action === 'C' ? '¿Está seguro de crear este registro?' : '¿Está seguro de actualizar?';
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: msg,
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            scope: self,
            fn: function (result) {
                if (result !== 'yes') {
                    return;
                }
                if (self.action === 'C') {
                    self.doCreate();
                } else {
                    self.doUpdate();
                }
            }
        });
    },
    buildBeanFromForm: function () {
        var bean = {};
        bean.CCUST = Ext.getCmp(prototype.id + '-deCCUST').getValue();
        bean.TREG = Ext.getCmp(prototype.id + '-deTREG').getValue();
        // STVAL nunca se envía: no se puede modificar desde el DataEntry.
        bean.ADATE = Ext.getCmp(prototype.id + '-deADATE').getValue();
        bean.SCOUNTRY = Ext.getCmp(prototype.id + '-deSCOUNTRY').getValue();
        bean.SAGENT = Ext.getCmp(prototype.id + '-deSAGENT').getValue();
        bean.SCURRENCY = Ext.getCmp(prototype.id + '-deSCURRENCY').getValue();
        bean.CBATCH = Ext.getCmp(prototype.id + '-deCBATCH').getValue();
        bean.SEQ = Ext.getCmp(prototype.id + '-deSEQ').getValue();
        bean.NETO = Ext.getCmp(prototype.id + '-deNETO').getValue();
        bean.PAYAMOU = Ext.getCmp(prototype.id + '-dePAYAMOU').getValue();
        bean.SDATE = Ext.getCmp(prototype.id + '-deSDATE').getValue();
        bean.REFERENCE = Ext.getCmp(prototype.id + '-deREFERENCE').getValue();
        bean.SFILE = Ext.getCmp(prototype.id + '-deSFILE').getValue();
        bean.NPAG = Ext.getCmp(prototype.id + '-deNPAG').getValue();
        bean.COMMENTS = Ext.getCmp(prototype.id + '-deCOMMENTS').getValue();
        return bean;
    },
    // "me" (global, sin var) es la instancia de DirectSalesController que
    // arma la grilla detrás; se refresca la vista que esté activa en ese
    // momento (detalle o dashboard) para no dejar datos desactualizados.
    refreshGridAfterSave: function () {
        if (typeof me === 'undefined') {
            return;
        }
        if (me.panelActual === '-panelDetailDirectSales' && me.setGridDetDirectSales) {
            me.setGridDetDirectSales();
        } else if (me.btnSearch_click) {
            me.btnSearch_click();
        }
    },
    doCreate: function () {
        var self = this;
        var bean = self.buildBeanFromForm();

        self.view.mask('Creating...');
        Ext.Ajax.request({
            url: prototype.url + '/createDirectSales',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(bean)
            },
            success: function (response) {
                self.view.unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    self.refreshGridAfterSave();
                    self.view.close();
                } else {
                    global.Msg({msg: res.msg || 'Error creating record.'});
                }
            },
            failure: function () {
                self.view.unmask();
                global.Msg({msg: 'Error creating record.'});
            }
        });
    },
    doUpdate: function () {
        var self = this;
        var bean = self.buildBeanFromForm();

        // Llave del registro: ADATE_OLD es el valor que tenía al abrir el
        // DataEntry (antes de cualquier edición), ya que ADATE es editable
        // y pudo haber cambiado en pantalla.
        bean.ADATE_OLD = self.originalADATE;

        self.view.mask('Updating...');
        Ext.Ajax.request({
            url: prototype.url + '/updateDirectSales',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(bean)
            },
            success: function (response) {
                self.view.unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    self.refreshGridAfterSave();
                    self.view.close();
                } else {
                    global.Msg({msg: res.msg || 'Error updating record.'});
                }
            },
            failure: function () {
                self.view.unmask();
                global.Msg({msg: 'Error updating record.'});
            }
        });
    },
    onCancelClick: function (btn) {
        var iframe = document.getElementById('pdfIframeVoucherDS');
        if (iframe) {
            iframe.removeAttribute('src');
        }
        this.view.close();
    }

});
