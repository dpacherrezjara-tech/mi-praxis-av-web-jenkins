/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.RFNDQuery.DetailRefundQueryRFNDController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailRefundQueryRFNDController',
    beanTMP: {},
    beanTKT: {},
    beanGuardar: {},
    beanDocuments: {},
    urlWin01: '',
    tipo: '',
    urlWin02: '',
    lst_CardTypeAGNT: null,
    lst_CardType: null,
    init: function (view) {
        var me = this;
        this.urlWin01 = Ext.String.trim(this.view.params.url01);
        this.urlWin02 = Ext.String.trim(this.view.params.url02);
        // console.log(this.view.params.action)
    },
    afterRender: function () {

        switch (String(this.view.params.action)) {
            case 'FORMQUERYRFND':

                Ext.getCmp(prototype.id01 + '-btn-save').hide();
                Ext.getCmp(prototype.id01 + '-gridRazones').hide();
                Ext.getCmp(prototype.id01 + '-btn-close').show();
                Ext.getCmp(prototype.id01 + '-gridRazonesDetall').show();
                this.tipo = '1';
                break;
            case 'FORMASSOCIATEDRFND':
                Ext.getCmp(prototype.id01 + '-contenedor-status').show();
                Ext.getCmp(prototype.id01 + '-win').setHeight(Ext.getCmp(prototype.id01 + '-win').getHeight() + 30);
                this.onLoadCmbStatus();
                Ext.getCmp(prototype.id01 + '-btn-save').show();
                Ext.getCmp(prototype.id01 + '-btn-close').show();
                Ext.getCmp(prototype.id01 + '-gridRazones').show();
                Ext.getCmp(prototype.id01 + '-gridRazonesDetall').hide();
                this.tipo = '2';
                break;
        }

        this.onLoadData(this.tipo);
        this.setStoresGrids();
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id01 + '-gridtkt');
        var grid03 = Ext.getCmp(prototype.id01 + '-gridRazones');
        var grid04 = Ext.getCmp(prototype.id01 + '-gridRazonesDetall');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id01 + '-store-grid01'
        });
        var store03 = Ext.create('Ext.data.Store', {
            storeId: prototype.id01 + '-store-grid03'
        });
        var store04 = Ext.create('Ext.data.Store', {
            storeId: prototype.id01 + '-store-grid04'
        });

        grid01.setStore(store01);
        //grid02.setStore(store02);
        grid03.setStore(store03);
        grid04.setStore(store04);
    },
    onLoadCmbStatus: function () {
        var ComboEstatus = Ext.getCmp(prototype.id01 + '-ComboEstatus');

        ComboEstatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "R", "name": "REJECT"},
                {"code": "F", "name": "AUTHORISE"}
            ]
        }));
    },
    onCmbStatusAfterrender: function () {
        var ComboEstatus = Ext.getCmp(prototype.id01 + '-ComboEstatus');
        ComboEstatus.setValue('');
    },
    onLoadData: function (id) {
        var me = this;
        rec = me.view.params.rec;
        Ext.getCmp(prototype.id01 + '-txtCanTKT').setValue(rec.get('A3647CANTIDAD'));// A3647CANTIDAD
        Ext.getCmp(prototype.id01 + '-txtNumber').setValue(rec.get('A3647FOLIO'));
        Ext.getCmp(prototype.id01 + '-txtArea').setValue(rec.get('A3647AREA'));
        Ext.getCmp(prototype.id01 + '-Company').setValue(rec.get('A3647COMP'));
        Ext.getCmp(prototype.id01 + '-txtAplidate').setValue(rec.get('A3647FAPPI'));
        Ext.getCmp(prototype.id01 + '-txtHourRFND').setValue(rec.get('A3647HAPPI'));
        Ext.getCmp(prototype.id01 + '-txtEmail').setValue(rec.get('A3647EMAIL'));
        Ext.getCmp(prototype.id01 + '-txtEmail2').setValue(rec.get('A3647EMAIC'));
        // Ext.getCmp(prototype.id01 + '-txtCURRENCY').setValue(rec.get('A3647MDA'));
        Ext.getCmp(prototype.id01 + '-txaDescription').setValue(rec.get('A3647RAAG'));

        Ext.getCmp(prototype.id01 + '-txtUSER').setValue(rec.get('A3647REGAS'));
        Ext.getCmp(prototype.id01 + '-txtStatus').setValue(rec.get('A3647STATO'));
        //Ext.getCmp(prototype.id01 + '-txtNeto').setValue(Ext.util.Format.number(rec.get('A3647NETO'), '0,000.00'));
        Ext.getCmp(prototype.id01 + '-txtDateModi').setValue(rec.get('A3647FREVI'));
        Ext.getCmp(prototype.id01 + '-txtCOUNTRY').setValue(rec.get('A3647PAIS'));
        //Ext.getCmp(prototype.id01 + '-txtTypeRFND').setValue(rec.get('A3647TRFD'));

        Ext.getCmp(prototype.id01 + '-txtPreme').setValue(rec.get('A3647PREME'));
        Ext.getCmp(prototype.id01 + '-txtTKTDUPLI').setValue(rec.get('A3647TKTDUPLI'));
        Ext.getCmp(prototype.id01 + '-txtFolio').setValue(rec.get('A3647FOLIO'));

        switch (Ext.String.trim(String(rec.get('A3647FLAG')))) {
            case 'A':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('ASSIGNED TO AUDITOR');
                break;
            case 'X':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('VOID');
                break;
            case 'B':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('CHANGE FOR ANOTHER');
                break;
            case 'C':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('INCONSISTENCY WITH THE ROBOT');
                break;
            case 'E':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('ERROR IN THE PROCESS');
                break;
            case 'R':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('REJECTED');
                break;
            case 'F':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('AUTHORISED');
                break;
            case 'Y':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('PENDING');
                break;
            case 'D':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('REEMBOLSABLE');
                break;
            case 'G':
                Ext.getCmp(prototype.id01 + '-txtStatusRFND').setValue('NO REEMBOLSABLE');
                break;
        }

        this.onLoadCalculosImpuestos(rec, id);
    },
    onLoadCalculosImpuestos: function (rec, id) {
        var me = this;
        me.beanTMP.IN_CIA = rec.get('A3647CCUST');
        me.beanTMP.IN_PREME = rec.get('A3647PREME');
        me.beanTMP.IN_DATEFROM = rec.get('A3647FAPPI');
        me.beanTMP.IN_ANIO = rec.get('A3647ANIO');
        Ext.getCmp(prototype.id01 + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: this.urlWin01 + '/SearchQueryRFNDetail',
            method: 'POST',
            timeout: '300000',
            params: me.beanTMP,
            success: function (response, options) {
                Ext.getCmp(prototype.id01 + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);

                me.beanDocuments = res.lst_DOCUMENTS;

                Ext.getCmp(prototype.id01 + '-gridtkt').getStore().removeAll();
                Ext.getCmp(prototype.id01 + '-gridtkt').getStore().loadData(res.lst_DOCUMENTS);

                Ext.getCmp(prototype.id01 + '-gridRazones').getStore().removeAll();
                Ext.getCmp(prototype.id01 + '-gridRazonesDetall').getStore().removeAll();
                if (id === '1') {
                    Ext.getCmp(prototype.id01 + '-gridRazonesDetall').getStore().loadData(res.lst_RAZON);
                } else {
                    Ext.getCmp(prototype.id01 + '-gridRazones').getStore().loadData(res.lst_RAZON);
                    var gridRazonespri = Ext.getCmp(prototype.id01 + '-gridRazones');
                    gridRazonespri.on('beforeedit', function (event, e) {
                        if (e.record.get('A3649CODE') === '00001' && e.record.get('A3649TYPE') === 'AM') {
                            return true;
                        } else {
                            return false;
                        }

                    }, gridRazonespri);
                }
            }
        });
    },
    onImageViewClick: function () {
        this.onWinFileViewerClick();
    },
    onWinFormRazonesClick: function () {
        var me = this;
        var win = new Ext.Praxis.view.salesaudit.RFNDPending.RFNDFormRazones({
            params: {
                vl_pais: Ext.getCmp(prototype.id01 + '-txtCOUNTRY').getValue(),
                url01: this.urlWin02
            }
        });
        win.show();
    },
    onWinFileViewerClick: function () {
        // 139 - 0370663898
        // console.log(rec.get('A3389FREGI') + '-' + rec.get('A3389PAIS') + '-' + rec.get('A3389NUMER'));

        var me = this;
        var win = new Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.BsplinkFileViewer({
            params: {
                rec: me.view.params.rec,
                url01: this.urlWin01
            }
        });
        win.show();
    },
    validaRequiredFields: function () {
        var bvalida = true;
        var vl_razon = '';
        var grid03 = Ext.getCmp(prototype.id01 + '-gridRazones');
        var regs = grid03.getStore().getCount();
        if (Ext.getCmp(prototype.id01 + '-ComboEstatus').getValue() === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Status');
            bvalida = false;
        }
        if (Ext.getCmp(prototype.id01 + '-txtPreme').getValue() === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter preme RFND');
            bvalida = false;
        }
        if (regs === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter issue reason');
            bvalida = false;
        }
        if (regs !== 0) {
            for (var i = 0; i < regs; i++) {
                if (grid03.getStore().getAt(i).get('A3649TYPE') === 'AM') {
                    vl_razon = vl_razon + grid03.getStore().getAt(i).get('A3649ERROR');
                    if (grid03.getStore().getAt(i).get('A3649ERROR').length > 250) {
                        Ext.Msg.alert('.: PRAXIS :.', 'The description must not exceed 250 characters');
                        bvalida = false;
                        return;
                    }
                }

            }
            if (vl_razon.length > 1000) {
                Ext.Msg.alert('.: PRAXIS :.', 'The description total must not exceed 1000 characters');
                bvalida = false;
            }
        }

        return bvalida;
    },
    OnColumnRazones1Renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var archivo = '';
        if (Ext.String.trim(value) !== '') {
            archivo = 'Download';
        }//'DetailBsplinkRefundQueryRFND'
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp( \'DetailRefundQueryRFND\').getController().onWinFile1ViewerClick(' + rowIndex + ');">' + archivo + '</span>'
    },
    onWinFile1ViewerClick: function (rowIndex) {
        var grid = Ext.getCmp(prototype.id01 + '-gridRazones');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);

        var DisputeFileViewer = Ext.create('Ext.Praxis.view.salesaudit.DisputeGestionBsplink.DisputeFileViewer', {id: 'DisputeFileViewer'});
        var controller = DisputeFileViewer.getController();
        controller.getFilesDirectory(rec.data, Ext.getCmp(prototype.id01 + '-txtNumber').getValue(''));
        DisputeFileViewer.show();
    },
    OnColumnRazones2Renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var archivo = '';
        if (Ext.String.trim(value) !== '') {
            archivo = 'Download';
        }//'DetailBsplinkRefundQueryRFND'
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp( \'DetailRefundQueryRFND\').getController().onWinFile2ViewerClick(' + rowIndex + ');">' + archivo + '</span>'
    },
    onWinFile2ViewerClick: function (rowIndex) {
        var grid = Ext.getCmp(prototype.id01 + '-gridRazonesDetall');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);

        var DisputeFileViewer = Ext.create('Ext.Praxis.view.salesaudit.DisputeGestionBsplink.DisputeFileViewer', {id: 'DisputeFileViewer'});
        var controller = DisputeFileViewer.getController();
        controller.getFilesDirectory(rec.data, Ext.getCmp(prototype.id01 + '-txtNumber').getValue(''));
        DisputeFileViewer.show();
    },
    onSaveClick: function (obj) {
        var vl_mensaje = 'Insert Data?';
        var me = this;
        if (me.validaRequiredFields()) {
            if (Ext.getCmp(prototype.id01 + '-txtTKTDUPLI').getValue() === 'Y') {
                vl_mensaje = 'The ticket has more than one document, do you want to continue?';
            }
            global.Msg({
                msg: vl_mensaje,
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {
                        rec = me.view.params.rec;
                        me.beanGuardar.IN_STATUS = Ext.getCmp(prototype.id01 + '-ComboEstatus').getValue();
                        me.beanGuardar.IN_PREME = Ext.getCmp(prototype.id01 + '-txtPreme').getValue();
                        me.beanGuardar.A3647EMAIL = Ext.getCmp(prototype.id01 + '-txtEmail').getValue();
                        me.beanGuardar.A3647EMAIC = rec.get('A3647EMAIC');
                        me.beanGuardar.A3647FOLIO = Ext.getCmp(prototype.id01 + '-txtFolio').getValue();
                        me.beanGuardar.IN_ANIO = rec.get('A3647ANIO');
                        me.beanGuardar.IN_IDIOMA = Ext.getCmp(prototype.id01 + '-txtIdioma').getValue();
                        me.beanGuardar.A3647SFW = rec.get('A3647SFW');
                        //  var me = this;me.beanTMP.IN_ANIO = rec.get('A3647ANIO');

                        var lstRazones = new Array();
                        for (var i = 0; i < Ext.getCmp(prototype.id01 + '-gridRazones').getStore().data.length; i++) {
                            var bean = Ext.getCmp(prototype.id01 + '-gridRazones').getStore().data.items[i].data;
                            lstRazones.push(bean);
                        }
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id01 + '-form'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin02 + '/ProcesaManualRFND/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanGuardar),
                                beanlstRazones: JSON.stringify(lstRazones)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD INSERTED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.id + '-Contenedor').getController().onSearchClick();
                                            Ext.getCmp(prototype.id01 + '-win').close();

                                        }


                                    }});
                            }
                        });
                    }

                }
            });
        }




    },
    onPDIViewClick: function (obj) {
        var txtSNumber = Ext.getCmp(prototype.id01 + '-txtSNumber').getValue();
        var FormPDIRFND = Ext.create('Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.FormPDIRFND', {id: 'FormPDIRFND'});
        var controller = FormPDIRFND.getController();
        controller.initial(txtSNumber, this.urlWin01);
        FormPDIRFND.show();



    },
    onCloseClick: function (obj) {
        Ext.getCmp(prototype.id01 + '-win').close();

    },
    onAddRazonClick: function (obj) {
        this.onWinFormRazonesClick();
    },
    OnChkRFNDRemove: function (grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        if (rec.data.A3649TYPE === 'Company') {
            Ext.Msg.alert('.: PRAXIS :.', 'The reason can not be eliminated because it is from the Company');
            return;
        }
        global.Msg({
            msg: 'DELETE RAZON?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    grid.getStore().removeAt(rowIndex);
                }
            }
        });

    },
    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var win = new Ext.Praxis.view.salesaudit.RFNDQuery.DetailTicket({
            params: {
                action: String(this.view.params.action),
                rec: rec,
                folio: Ext.getCmp(prototype.id01 + '-txtNumber').getValue(),
                qtytkt: Ext.getCmp(prototype.id01 + '-txtCanTKT').getValue()
            }
        });
        win.show();
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onLoaDatosTicket: function () {
        var me = this;
        Ext.getCmp(prototype.id01 + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: this.urlWin01 + '/SearchQueryRFNDetail',
            method: 'POST',
            timeout: '300000',
            params: me.beanTMP,
            success: function (response, options) {
                Ext.getCmp(prototype.id01 + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);

                me.beanDocuments = res.lst_DOCUMENTS;

                Ext.getCmp(prototype.id01 + '-gridtkt').getStore().removeAll();
                Ext.getCmp(prototype.id01 + '-gridtkt').getStore().loadData(res.lst_DOCUMENTS);
                Ext.getCmp(prototype.id01 + '-gridRazones').getStore().removeAll();
                Ext.getCmp(prototype.id01 + '-gridRazonesDetall').getStore().removeAll();
                Ext.getCmp(prototype.id01 + '-gridRazones').getStore().loadData(res.lst_RAZON);
            }
        });
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3648FLAG'))) {
            case 'Pending':
                value = 'orange';
                break;
            case 'Used':
                value = 'SALMON';
                break;
            case 'Authorise':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },

});