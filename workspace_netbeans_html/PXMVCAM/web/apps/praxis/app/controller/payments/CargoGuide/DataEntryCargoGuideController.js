Ext.define('Ext.Praxis.controller.payments.CargoGuide.DataEntryCargoGuideController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCargoGuideController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beandDeleteDetailPayment: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function (view) {
        prototype.id = 'CargoGuideForm';
        prototype.url = CONTEXTPATH + '/CargoGuide';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
    },
    afterRender: function () {
//        this.obtainData();
        switch (this.actionCode) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.mostrarData();
                this.DeshabilitarCampoClave();
                this.searchMPF291ByBatch();
                Ext.getCmp(prototype.id + '-de-btnDownloadPDF').show();
                Ext.getCmp(prototype.id + '-de-btnPreviewPDF').show();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                this.showPdfSideBySide();
                Ext.getCmp(prototype.id + '-de-panelScan').show();
                break;
        }
    },
    mostrarData: function () {

        this.setValue('de-txtADATE', this.bean.data.ADATE);
        this.setValue('de-txtPAYDATE', this.bean.data.PAYDAY);
        this.setValue('de-txtNCICLO', this.bean.data.NCICLO);
        this.setValue('de-txtNPAGE', this.bean.data.NPAGE);
        this.setValue('de-txtMETPAGO', this.bean.data.METPAGO);
        this.setValue('de-txtSTATE', this.bean.data.STATE);
        this.setValue('de-txtREFERENCE', this.bean.data.REFERENCE || '');
        this.setValue('de-txtSFILE', this.bean.data.SFILE || '');

        var cmbStval = Ext.getCmp(prototype.id + '-de-cmbSTVAL');
        if (cmbStval) {
            cmbStval.setValue(this.bean.data.STVAL || '');
        }

        var saldo = this.bean.data.SALDO;
        if (saldo !== null && saldo !== undefined) {
            this.setValue('de-txtSALDO', saldo);
        }

        this.setValue('de-txtMONEDA', this.bean.data.SCURRENCY);

        let importe = this.bean.data.MONTO;

        if (importe !== null && importe !== undefined) {
            this.setValue('de-txtIMPORTE', importe);
        }

        // AUDIT INFORMATION
        this.setValue('de-txtUSCR', this.bean.data.USCR);
        this.setValue('de-txtFECR', this.bean.data.FECR);
        this.setValue('de-txtHOCR', this.bean.data.HOCR);
        this.setValue('de-txtUSUP', this.bean.data.USUP);
        this.setValue('de-txtFEUP', this.bean.data.FEUP);
        this.setValue('de-txtHOUP', this.bean.data.HOUP);
    },
    obtainData: function () {

        console.log("obtainData");

        var cmbFreqType = Ext.getCmp(prototype.id + '-de-cmbFREQTYPE');
        cmbFreqType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "None"],
                ["D", "Daily"],
                ["W", "Weekly"],
                ["M", "Monthly"],
                ["N", "Not Scheduled"]
            ]
        }));

        var cmbFREQDAYS = Ext.getCmp(prototype.id + '-de-cmbFREQDAYS');
        cmbFREQDAYS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["A", "All Days"],
                ["W", "Weekdays"],
                ["S", "Weekend"],
                ["", "None"]
            ]
        }));

        var cmb = Ext.getCmp(prototype.id + '-de-cmbSTATUSRO');
        cmb.bindStore(Ext.create('Ext.data.ArrayStore', {
            fields: ['code', 'name'],
            data: [
                ["A", "Active"],
                ["I", "Inactive"]
            ]
        }));

    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
        console.log('llenarData');

        beanTemp.IN_CCUST = this.bean.data.CCUST;
        beanTemp.IN_SCOUNTRY = this.bean.data.SCOUNTRY;
        beanTemp.IN_NPAGE = this.bean.data.NPAGE;
        beanTemp.IN_PAYDAY = this.bean.data.PAYDAY;
        beanTemp.IN_TYPE = this.bean.data.TYPE;
        beanTemp.IN_SEQ = this.bean.data.SEQ;
        beanTemp.IN_MONTO =  this.getValue('de-txtIMPORTE');
        beanTemp.IN_ADATE =  this.getValue('de-txtADATE');
        // CUSCA/CODPSE ya no se editan desde este formulario; se reenvían tal cual venían.
        beanTemp.IN_CUSCA = this.bean.data.CUSCA || '';
        beanTemp.IN_CODPSE = this.bean.data.CODPSE || '';
        beanTemp.IN_REFERENCE = this.getValue('de-txtREFERENCE');
        beanTemp.IN_CBATCH = this.bean.data.CBATCH;
        beanTemp.IN_DATEBAT = this.bean.data.DATEBAT;
        beanTemp.IN_STATE = this.getValue('de-txtSTATE');

        var cmbStval = Ext.getCmp(prototype.id + '-de-cmbSTVAL');
        beanTemp.IN_STVAL = cmbStval ? (cmbStval.getValue() || '') : (this.bean.data.STVAL || '');
        beanTemp.IN_SALDO = this.getValue('de-txtSALDO');

        console.log(beanTemp);

    },
    searchMPF291ByBatch: function () {
        var win   = this.view;
        var data  = this.bean.data;
        var grid  = Ext.getCmp(prototype.id + '-de-gridMPF291');
        var panel = Ext.getCmp(prototype.id + '-de-panelMPF291');

        var bean = {
            IN_CBATCH:  data.CBATCH  || '',
            IN_DATEBAT: data.DATEBAT || ''
        };

        win.mask('Loading linked records...');

        Ext.Ajax.request({
            url: prototype.url + '/searchMPF291ByBatch',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            success: function (response) {
                win.unmask();
                var res     = Ext.JSON.decode(response.responseText);
                var records = res.data || [];
                
                // --- CAMBIO CLAVE AQUÍ ---
                // Limpiar la grilla antes de cargar los nuevos datos
                grid.getStore().removeAll();
                
                // Cargar la nueva data (que debería venir con un registro menos si lo borraste)
                grid.getStore().loadData(records);
                // -------------------------
                
                panel.setVisible(records.length > 0);
                win.center();
            },
            failure: function () {
                win.unmask();
                Ext.Msg.alert('Error', 'Could not load linked MPF291 records.');
            }
        });
    },

    // Enlarge the window and show the PDF preview pane next to the data form.
    showPdfSideBySide: function () {
        var win = this.view;
        var vw  = Ext.Element.getViewportWidth();
        var vh  = Ext.Element.getViewportHeight();
        win.setWidth(Math.min(1640, vw - 40));
        win.setHeight(Math.min(900, vh - 40));
        this.loadPdfPreview();
        win.center();
    },

    // Arma el objeto de filtros del scan (Source queda fijo en "Extractos" por ahora) y lo envía al endpoint MPS734.
    onScanSearch: function () {
        var grid = Ext.getCmp(prototype.id + '-de-gridScan');

        var adate = (Ext.getCmp(prototype.id + '-de-scanADATE').getValue() || '').trim();
        if (adate && !/^\d+$/.test(adate)) {
            Ext.Msg.alert('Scan', 'ADATE debe contener solo números.');
            return;
        }
        adate = adate.substring(0, 8);

        // MONTO va como texto: solo dígitos, punto decimal y signo negativo (no se castea a Number).
        var montoVal = Ext.getCmp(prototype.id + '-de-scanMONTO').getValue();
        var monto = (montoVal === null || montoVal === undefined) ? '' : String(montoVal).replace(/[^0-9.\-]/g, '');

        var account   = (Ext.getCmp(prototype.id + '-de-scanACCOUNT').getValue()    || '').trim().substring(0, 6);
        var texto     = (Ext.getCmp(prototype.id + '-de-scanTEXTO').getValue()     || '').trim().substring(0, 60);
        var bandoc    = (Ext.getCmp(prototype.id + '-de-scanBANDOC').getValue()    || '').trim().substring(0, 10);
        var stval     = (Ext.getCmp(prototype.id + '-de-scanSTVAL').getValue()     || '').trim();

        var bean = {
            IN_ADATE:   adate,
            IN_MONTO:   monto,
            IN_ACCOUNT: account,
            IN_TEXTO:   texto,
            IN_BANDOC:  bandoc,
            IN_STVAL:   stval
        };

        var beanString = JSON.stringify(bean);
        meDE.scanParams = {bean: bean, beanString: beanString};
        console.log('onScanSearch -> params enviados:', bean);
        console.log('onScanSearch -> beanString:', beanString);

        grid.mask('Scanning...');
        Ext.Ajax.request({
            url: prototype.url + '/scanBankMovements',
            method: 'POST',
            timeout: 60000,
            params: {beanString: beanString},
            success: function (response) {
                grid.unmask();
                var res = Ext.JSON.decode(response.responseText);
                grid.getStore().loadData(res.data || []);
                if (!res.data || res.data.length === 0) {
                    global.Msg({msg: 'Data not found.'});
                }
            },
            failure: function () {
                grid.unmask();
                Ext.Msg.alert('Error', 'No se pudo conectar con el servidor.');
            }
        });
    },

    // Reconcile the current MPF295 payment against the selected MPF287 bank movement (MPS735).
    onReconcileManual: function () {
        var grid = Ext.getCmp(prototype.id + '-de-gridScan');
        var sel  = grid.getSelectionModel().getSelection();
        if (!sel || sel.length === 0) {
            Ext.Msg.alert('Reconcile', 'Select a bank movement to reconcile with.');
            return;
        }
        var r    = sel[0].data;
        var pago = this.bean.data;

        var montoPago      = parseFloat(pago.MONTO) || 0;
        var montoExtracto  = parseFloat(r.NETO) || 0;

        // Misma regla que el match automático: los montos deben coincidir en valor absoluto.
        if (Math.abs(Math.abs(montoPago) - Math.abs(montoExtracto)) > 0.01) {
            Ext.Msg.alert('Reconcile', 'Conciliación manual no procede porque el monto es distinto.');
            return;
        }

        var payload = {
            IN_SFILE:    pago.SFILE    || '',
            IN_SCOUNTRY: pago.SCOUNTRY || '',
            IN_NPAGE:    pago.NPAGE    || '',
            IN_SEQ:      pago.SEQ      || '',
            IN_MONTO:    montoPago,
            IN_BANDOC:   r.BANDOC || '',
            IN_ADATE:    r.ADATE  || '',
            IN_TEXTO:    r.TEXTO  || '',
            IN_NETO:     montoExtracto
        };

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to reconcile this payment with BANDOC ' + (r.BANDOC || '') + '?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            scope: this,
            fn: function (btn) {
                if (btn !== 'yes') {
                    return;
                }

                grid.mask('Reconciling...');
                Ext.Ajax.request({
                    url: prototype.url + '/reconcileManual',
                    method: 'POST',
                    timeout: 60000,
                    params: {beanString: JSON.stringify(payload)},
                    success: function (response) {
                        grid.unmask();
                        var res = Ext.JSON.decode(response.responseText);
                        global.Msg({msg: res.Mensaje});
                        if (res.success) {
                            Ext.getCmp(prototype.id + '-dataEntry').close();
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click');
                        }
                    },
                    failure: function () {
                        grid.unmask();
                        Ext.Msg.alert('Error', 'No se pudo conectar con el servidor.');
                    }
                });
            }
        });
    },

    // Load (or reload) the current record's PDF into the embedded preview pane.
    loadPdfPreview: function () {
        var data    = (this.bean && this.bean.data) ? this.bean.data : {};
        var sfile   = data.SFILE    || '';
        var country = data.SCOUNTRY || '';
        var pane    = Ext.getCmp(prototype.id + '-de-pdfPane');
        var frame   = Ext.getCmp(prototype.id + '-de-pdfFrame');
        var title   = Ext.getCmp(prototype.id + '-de-pdfTitle');

        if (pane) { pane.show(); }
        var dom = (frame && frame.getEl()) ? frame.getEl().dom : null;

        if (!sfile) {
            if (title) { title.update('<b style="color:#fff;font-size:12px;letter-spacing:1px;">&#128196;&nbsp;PDF PREVIEW</b>'); }
            if (dom) {
                dom.removeAttribute('src');
                dom.srcdoc = '<div style="font-family:Segoe UI,Arial;color:#90A4AE;text-align:center;margin-top:60px;font-size:14px;">No PDF associated with this record (SFILE is empty).</div>';
            }
            return;
        }

        // Jump straight to the record's page (NPAGE) using the PDF viewer #page anchor.
        var npage = parseInt(data.NPAGE, 10);
        var pageHash = (!isNaN(npage) && npage > 0) ? ('#page=' + npage) : '';

        if (title) {
            title.update('<b style="color:#fff;font-size:12px;letter-spacing:1px;">&#128196;&nbsp;' + Ext.String.htmlEncode(sfile)
                + (pageHash ? ' &mdash; Page ' + npage : '') + '</b>');
        }
        var url = prototype.url + '/downloadPDF?sfile=' + encodeURIComponent(sfile) + '&country=' + encodeURIComponent(country) + '&disposition=inline' + pageHash;
        if (dom) {
            dom.removeAttribute('srcdoc');
            dom.src = url;
        }
    },

    onDownloadPDF: function () {
        var data  = (this.bean && this.bean.data) ? this.bean.data : {};
        var sfile   = data.SFILE    || '';
        var country = data.SCOUNTRY || '';
        if (!sfile) {
            Ext.Msg.alert('Warning', 'No file associated with this record (SFILE is empty).');
            return;
        }
        window.open(prototype.url + '/downloadPDF?sfile=' + encodeURIComponent(sfile) + '&country=' + encodeURIComponent(country) + '&disposition=attachment');
    },

    onPreviewPDF: function () {
        var data  = (this.bean && this.bean.data) ? this.bean.data : {};
        var sfile   = data.SFILE    || '';
        var country = data.SCOUNTRY || '';
        if (!sfile) {
            Ext.Msg.alert('Warning', 'No file associated with this record (SFILE is empty).');
            return;
        }
        var npage = parseInt(data.NPAGE, 10);
        var pageHash = (!isNaN(npage) && npage > 0) ? ('#page=' + npage) : '';
        var url = prototype.url + '/downloadPDF?sfile=' + encodeURIComponent(sfile) + '&country=' + encodeURIComponent(country) + '&disposition=inline' + pageHash;
        Ext.create('Ext.window.Window', {
            title: 'PDF Preview — ' + sfile + (pageHash ? ' (Page ' + npage + ')' : ''),
            width: 900,
            height: 700,
            modal: true,
            layout: 'fit',
            items: [{
                xtype: 'component',
                autoEl: {
                    tag: 'iframe',
                    src: url,
                    frameborder: '0',
                    style: 'width:100%;height:100%;border:none;'
                }
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                layout: {pack: 'center'},
                items: [{
                    text: 'Close',
                    scale: 'medium',
                    handler: function (btn) { btn.up('window').close(); }
                }]
            }]
        }).show();
    },
    getData: function () {
//        console.log('getData');
        var beanString = JSON.stringify(meDE.bean.data);
//        console.log(beanString);

//        Ext.Ajax.request({
//            url: prototype.url + '/searchCompleteDetail',
//            method: 'POST',
//            timeout: 60000000,
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
//            params: {beanString: beanString},
//            success: function (response, options) {
//                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
//                var res = Ext.JSON.decode(response.responseText);
//                meDE.beanResult = res.result;
//                meDE.mostrarData();
//
//            }
//        });
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('txtCODSOUR', '');
        this.setValue('txtDESSOU', '');
        this.setValue('txtGRUSOR', '');
        this.setValue('txtstrGRUSOR', '');
        Ext.getCmp(prototype.id + '-lblDescripcion').setText('');
        Ext.getCmp(prototype.id + '-lblDescripcion2').setText('');
        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
    },
    //</editor-fold>
    toUpperCase: function (obj, value, opts) {
//        console.log(obj);
//        console.log(value);
//        console.log(opts);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);
                    console.log('onSaveClick');
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        this.MaintenanceA2280(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        console.log('onUpdateClick');
        console.log(btn, 'BTN')
        this.update(btn);
    },
    update: function (btn) {
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update ?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            var beanTemp = {};
                            this.llenarData(beanTemp);
                            beanTemp.option = 'U';
                            this.MaintenanceA2280(beanTemp);
                        }
                    }
                });
    },
    onDeleteClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    beanTemp.option = 'D';
                    this.MaintenanceA2280(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceA2280: function (beanTemp) {
        console.log(beanTemp,'beanTemp')
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA2280',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    Ext.getCmp(prototype.id + '-dataEntry').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click');

                } else
                    global.Msg({msg: ''});
            }
        });
    },
    //</editor-fold>

    validacionInsert: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCODE") === '' || this.getValue("de-txtCODEBANK") === '' || this.getValue("de-txtCOUNTRY") === '' || this.getValue("de-txtCURRENC") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    // Detail quedó reducido a 9 campos: STVAL, ADATE, SALDO y STATE son
    // editables (no se deshabilitan); PAYDAY, Cycle, NPAGE, METPAGO y SFILE
    // son de solo lectura.
    DeshabilitarCampoClave: function () {

        let camposDeshabilitar = [
            'de-txtPAYDATE',
            'de-txtNCICLO',
            'de-txtMETPAGO',
            'de-txtNPAGE',
            'de-txtSFILE',
            'de-txtMONEDA',
            'de-txtUSCR',
            'de-txtFECR',
            'de-txtHOCR',
            'de-txtUSUP',
            'de-txtFEUP',
            'de-txtHOUP'
        ];

        camposDeshabilitar.forEach(id => {
            let cmp = Ext.getCmp(prototype.id + '-' + id);
            if (cmp)
                cmp.setReadOnly(true);
        });
    },
    Habilitarlbl: function () {
        Ext.getCmp(prototype.id + '-lblDescripcion').show();
        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function () {
        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
            Ext.getCmp(prototype.id + '-lbldes').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes').show();
        }
    },
    Habilitarlbl1: function () {
        Ext.getCmp(prototype.id + '-lbldes').hide();
        if (this.getValue("txtCODSOUR") === '') {
            Ext.getCmp(prototype.id + '-lbldes2').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes2').show();
        }
    },
    
    
    
    
    
    
    
    
    onDeleteDetailPayment: function (column, e, row, colIndex, x, rowData) {
        var data = rowData.data;

        var beanDelete = {
            IN_CBATCH: data.CBATCH,
            IN_DATEBAT: data.DATEBAT,
            IN_CCUST : data.CCUST,
            IN_AWBNO : data.AWBNO,
            IN_SFILE : data.SFILE
        };

        // Pedimos confirmación al usuario
        Ext.Msg.confirm('Confirmación', '¿Está seguro que desea liberar/limpiar los registros del lote ' + data.CBATCH + '?', function (btn) {
            if (btn === 'yes') {
                
                // Si dice que sí, enviamos la petición al endpoint
                Ext.Ajax.request({
                    url: prototype.url + '/deleteDetailPayment', // Nombre del nuevo endpoint
                    method: 'POST',
                    params: {
                        beanString: JSON.stringify(beanDelete)
                    },
                    success: function (response) {
                        var res = Ext.decode(response.responseText);
                        
                        if (res.success) {
                            global.Msg({ msg: res.message });
                            
                            meDE.searchMPF291ByBatch();
                        } else {
                            global.Msg({ msg: res.message });
                        }
                    },
                    failure: function () {
                        global.Msg({ msg: 'Error de comunicación con el servidor.' });
                    }
                });
            }
        });
    },
    
    
    
    
    
    
    
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        console.log(prototype.id + '-' + id, 'uu')
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    },
    buildCron: function (freqType, freqDays, timeExec) {
        if (!freqType || freqType === "N")
            return "0 0 0 31 2 ?"; // deshabilitado

        let hour = timeExec.substring(0, 2);
        let minute = timeExec.substring(2, 4);

        if (freqType === "D") {
            return `0 ${minute} ${hour} * * ?`;
        }

        if (freqType === "W") {
            if (freqDays === "W")
                return `0 ${minute} ${hour} ? * MON-FRI`;
            if (freqDays === "S")
                return `0 ${minute} ${hour} ? * SAT,SUN`;
            return `0 ${minute} ${hour} * * ?`;
        }

        if (freqType === "M") {
            return `0 ${minute} ${hour} 1 * ?`;
        }

        return "0 0 0 31 2 ?"; // safe fallback
    }
// </editor-fold>
})