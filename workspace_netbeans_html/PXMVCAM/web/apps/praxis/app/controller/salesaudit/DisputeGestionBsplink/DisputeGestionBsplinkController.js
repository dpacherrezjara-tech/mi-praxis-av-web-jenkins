
Ext.define('Ext.Praxis.controller.salesaudit.DisputeGestionBsplink.DisputeGestionBsplinkController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DisputeGestionBsplinkController',
    bean: {},
    bean2: {},
    beanINI: {},
    /**
     * Constructor
     */

    init: function (view) {
        var me = this;


    },

    afterRender: function () {
        this.setReasons();
        this.setStores();
        this.setUser();
        this.setStoresFilters();
        this.onLoadUsers();
        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
        this.oninitSearch();

    },
    OnBeforeShow: function () {
        prototype.id = 'DisputeGestionBsplink';
        prototype.id1 = 'DetailDisputeGestionBsplink';
        prototype.id3 = 'DisputeFileViewer';
        prototype.url = CONTEXTPATH + '/DisputeGestionBsplink';
        prototype.url02 = CONTEXTPATH + '/BwrBSPLINKRFND';
    },
    setReasons: function () {
        var cmbError = Ext.getCmp(prototype.id + '-cmbError');
        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/loadDataInit',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalPorperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (obj, records, successful, operation, eOpts) {
                    cmbError.setValue('');
                }
            }
        });
        cmbError.setStore(store);
    },
    setUser: function () {
        Ext.Ajax.request({
            url: prototype.url02 + '/getUser',
            timeout: 60000000,
            method: 'POST',
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.id + '-Audit').setValue(Ext.String.trim(res.user.USR));
                me.imgSearch_clickHandler();
            }
        });
    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
        }
    },
    oninitSearch: function () {
        Ext.getCmp(prototype.id + '-search-type').setValue('1');
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setVisible(true);
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setVisible(true);
        Ext.getCmp(prototype.id + '-ComboOrigin').setVisible(true);
        Ext.getCmp(prototype.id + '-ComboArea').setVisible(true);
        Ext.getCmp(prototype.id + '-box-filter-02').setVisible(true);

        Ext.getCmp(prototype.id + '-country').setVisible(false);
        Ext.getCmp(prototype.id + '-iata').setVisible(false);
        Ext.getCmp(prototype.id + '-nmemo').setVisible(false);

        Ext.getCmp(prototype.id + '-country').setValue('');
        Ext.getCmp(prototype.id + '-iata').setValue('');
        Ext.getCmp(prototype.id + '-nmemo').setValue('');



    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A2548SEMAFORO'))) {
            case 'ORANGE':
                value = 'orange';
                break;
            case 'GREEN':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */

    onPagingBeforeChange01: function (obj, page, opts) {
        var store = obj.getStore();
        var totRow = store.getCount() != 0 ? store.totalCount : 0;
        obj.store.proxy.extraParams = {
            beanString: JSON.stringify(this.bean),
            totRow: totRow
        };
    },
    setStores: function () {
        var grid00 = Ext.getCmp(prototype.id + '-gridData');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchReportADM/',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);

        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store00);
    },
    /*setStores: function() {
     alert(Ext.getCmp(prototype.id + '-Audit').getValue());
     var grid01 = Ext.getCmp(prototype.id + '-gridData');
     this.beanINI.OPCIONTYPE = '1';
     this.beanINI.STATUS = "D";
     this.beanINI.VP_USER =  Ext.getCmp(prototype.id + '-Audit').getValue();
     
     var store01 = Ext.create('Ext.data.Store', {
     proxy: {
     type: 'ajax',
     url: prototype.url + '/SearchReportADM/',
     timeout: '300000',
     reader: {
     type: 'json',
     rootProperty: 'data',
     totalProperty: 'total'
     }
     },
     //autoLoad: true,
     pageSize: 20
     });
     store01.load({
     params: {beanString: JSON.stringify(this.beanINI)}
     });
     //store01.load();
     grid01.setStore(store01);
     
     Ext.getCmp(prototype.id + '-pagginator-01').setStore(store01);
     
     },*/
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var cmbOrigin = Ext.getCmp(prototype.id + '-ComboOrigin');
        var cmbArea = Ext.getCmp(prototype.id + '-ComboArea');

        var cmbSource = Ext.getCmp(prototype.id + '-ComboSource');
        var cmbChannel = Ext.getCmp(prototype.id + '-ComboChannel');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "3", "name": "ACCOUNTING DATE"},
                {"code": "5", "name": "AGENCY"},
                {"code": "2", "name": "MEMO NUMBER"},
                {"code": "4", "name": "PROCESSING DATE"},
                {"code": "1", "name": "SYSTEM DATE"}
            ]
        }));

        cmbOrigin.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "PR", "name": "AUTOMATIC"},
                {"code": "BK", "name": "BACKEND"},
                {"code": "MA", "name": "MANUAL"},
                {"code": "MS", "name": "MASSIVE"},
                {"code": "QR", "name": "QUERYS"},
                {"code": "UP", "name": "UPFRONT"}

            ]
        }));

        cmbArea.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "FR", "name": "FRANQUICIAS"},
                {"code": "CR", "name": "CREDITO Y COBRANZAS"},
                {"code": "QR", "name": "QUERYS"},
                {"code": "VI", "name": "VENTA INDIRECTA"},
                {"code": "CM", "name": "COMMISIONES"},
                {"code": "UP", "name": "UPFRONT"}
            ]
        }));

        cmbSource.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "BSP", "name": "BSP"},
                {"code": "ASR", "name": "ASR"},
                {"code": "ARC", "name": "ARC"}
            ]
        }));

        cmbChannel.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "ATO", "name": "ATO"},
                {"code": "CCT", "name": "CCT"},
                {"code": "CTO", "name": "CTO"},
                {"code": "WEB", "name": "WEB"},
                {"code": "FRA", "name": "FRA"}
            ]
        }));



    },
    onLoadUsers: function () {
        // var cmbUser = Ext.getCmp(prototype.id + '-txtUser');
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('1');
    },
    onCmbOriginAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbSourceAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbChannelAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbAreaAfterRender: function (obj) {
        obj.setValue('');
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onCmbSearchSelect: function (obj, records, eOpts) {
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        var CmbOrigin = Ext.getCmp(prototype.id + '-ComboOrigin');
        var CmbArea = Ext.getCmp(prototype.id + '-ComboArea');
        var filter = Ext.getCmp(prototype.id + '-box-filter-02');

        var txtcountry = Ext.getCmp(prototype.id + '-country');
        var txtiata = Ext.getCmp(prototype.id + '-iata');
        var txtnmemo = Ext.getCmp(prototype.id + '-nmemo');

        switch (String(obj.getValue())) {
            case '1':
            case '3':
            case '4':


                txtFilterDateFrom.show();
                txtFilterDateTo.show();
                CmbOrigin.show();
                CmbArea.show();
                filter.show();

                txtcountry.hide();
                txtiata.hide();
                txtnmemo.hide();

                Ext.getCmp(prototype.id + '-country').setValue('');
                Ext.getCmp(prototype.id + '-iata').setValue('');
                Ext.getCmp(prototype.id + '-nmemo').setValue('');
                break;
            case '2':
                txtnmemo.show();
                txtcountry.show();

                txtFilterDateFrom.hide();
                txtFilterDateTo.hide();
                CmbOrigin.hide();
                CmbArea.hide();
                filter.hide();
                txtiata.hide();

                Ext.getCmp(prototype.id + '-iata').setValue('');
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
                Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
                Ext.getCmp(prototype.id + '-ComboOrigin').setValue('');
                Ext.getCmp(prototype.id + '-ComboArea').setValue('');
                break;
            case '5':

                txtiata.show();
                CmbOrigin.show();
                CmbArea.show();

                txtnmemo.hide();
                txtcountry.hide();
                txtFilterDateFrom.hide();
                txtFilterDateTo.hide();
                CmbArea.hide();
                filter.hide();

                Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
                Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
                Ext.getCmp(prototype.id + '-country').setValue('');
                Ext.getCmp(prototype.id + '-nmemo').setValue('');
                break;
            case '':
                txtiata.hide();
                CmbOrigin.hide();
                CmbArea.hide();

                txtnmemo.hide();
                txtcountry.hide();
                txtFilterDateFrom.hide();
                txtFilterDateTo.hide();
                CmbArea.hide();
                filter.hide();

                Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
                Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
                Ext.getCmp(prototype.id + '-ComboOrigin').setValue('');
                Ext.getCmp(prototype.id + '-ComboArea').setValue('');
                Ext.getCmp(prototype.id + '-country').setValue('');
                Ext.getCmp(prototype.id + '-nmemo').setValue('');
                break;
                // boxFilter02.hide();
                // boxFilter02.setBorder(false)
        }
    },
    onCmbSourceSelect: function (obj, records, eOpts) {

        if (obj.getValue() == 'ASR' || obj.getValue() == 'BSP') {
            Ext.getCmp(prototype.id + '-country2').setVisible(true);
        } else {
            Ext.getCmp(prototype.id + '-country2').setVisible(false);
        }
        switch (String(obj.getValue())) {
            case 'ASR':
                Ext.getCmp(prototype.id + '-ComboChannel').setVisible(true);
                break;
            case 'BSP':
            case 'ARC':
                Ext.getCmp(prototype.id + '-ComboChannel').setVisible(false);
                break;
                // boxFilter02.hide();
                // boxFilter02.setBorder(false)
        }

    },
    onSearchkey: function (f, e) {
        if (e.getKey() == e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    imgSearch_clickHandler: function (obj, records, eOpts) {

        var cmbsearch = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var txtIata = Ext.getCmp(prototype.id + '-iata').getValue();
        var cmbOrigin = Ext.getCmp(prototype.id + '-ComboOrigin').getValue();
        var CombArea = Ext.getCmp(prototype.id + '-ComboArea').getValue();
        var txtnmemo = Ext.getCmp(prototype.id + '-nmemo').getValue();
        var txtcountry = Ext.getCmp(prototype.id + '-country').getValue();
        var CombSource = Ext.getCmp(prototype.id + '-ComboSource').getValue();
        var CombChannel = Ext.getCmp(prototype.id + '-ComboChannel').getValue();
        var txtcountry2 = Ext.getCmp(prototype.id + '-country2').getValue();
        var txtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var txtTourCode = Ext.getCmp(prototype.id + '-TourCode').getValue();
        var txtAudit = Ext.getCmp(prototype.id + '-Audit').getValue();
        if (cmbsearch == '') {
            Ext.MessageBox.alert('PRAXIS', "Select Search Type", function (btn, text) {
                if (btn == 'ok' || btn == 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-search-type').focus();", 100);
            });
            return;
        }
        if (txtDateFrom != '' && txtDateTo != '') {

            if (global.existeFecha(txtDateFrom) != '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtDateFrom), function (btn, text) {
                    if (btn == 'ok' || btn == 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
                });
                return;
            }

            if (global.existeFecha(txtDateTo) != '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtDateTo), function (btn, text) {
                    if (btn == 'ok' || btn == 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
            if (Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue()) > Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue())) {
                Ext.MessageBox.alert('PRAXIS', "the starting date must be less than the end date", function (btn, text) {
                    if (btn == 'ok' || btn == 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
        }

        var cmbsearch = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var txtIata = Ext.getCmp(prototype.id + '-iata').getValue();
        var cmbOrigin = Ext.getCmp(prototype.id + '-ComboOrigin').getValue();
        var CombArea = Ext.getCmp(prototype.id + '-ComboArea').getValue();
        var txtnmemo = Ext.getCmp(prototype.id + '-nmemo').getValue();
        var txtcountry = Ext.getCmp(prototype.id + '-country').getValue();
        var CombSource = Ext.getCmp(prototype.id + '-ComboSource').getValue();
        var CombChannel = Ext.getCmp(prototype.id + '-ComboChannel').getValue();
        var txtcountry2 = Ext.getCmp(prototype.id + '-country2').getValue();
        var txtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var txtTourCode = Ext.getCmp(prototype.id + '-TourCode').getValue();
        var txtAudit = Ext.getCmp(prototype.id + '-Audit').getValue();
        var cmbError = Ext.getCmp(prototype.id + '-cmbError').getValue();
        if (cmbError === null) {
            cmbError = '';
        }


        if (cmbsearch === "2") {

            this.bean.COMBOBY = "";
            this.bean.OPCIONTYPE = cmbsearch;
            this.bean.NUMBERADM = txtnmemo;
            this.bean.COUNTRY = txtcountry;
            this.bean.DATEFROM = '';
            this.bean.DATETO = '';
            this.bean.CURRENCY = '';
            this.bean.COMBOCHANNEL = '';
            this.bean.CHANNEL = '';
            this.bean.AUTMAN = '';
            this.bean.STATUS = 'D';
            this.bean.VP_TUORCODE = '';
            this.bean.VP_IATA = '';
        } else if (cmbsearch === "1" || cmbsearch === "3" || cmbsearch === "4") {

            this.bean.OPCIONTYPE = cmbsearch;
            this.bean.DATEFROM = txtDateFrom;
            this.bean.DATETO = txtDateTo;
            this.bean.COMBOBY = "";
            this.bean.AUTMAN = cmbOrigin;
            this.bean.STATUS = "D";
            this.bean.COMBOCHANNEL = CombSource;
            this.bean.CHANNEL = CombChannel;
            this.bean.COUNTRY = txtcountry2;
            this.bean.CURRENCY = txtCurrency;
            this.bean.VP_TUORCODE = txtTourCode
            this.bean.VP_IATA = '';
            this.bean.NUMBERADM = '';

        } else if (cmbsearch === "5") {
            this.bean.NUMBERADM = '';
            this.bean.OPCIONTYPE = cmbsearch;
            this.bean.VP_IATA = txtIata;
            this.bean.COMBOBY = "";
            this.bean.AUTMAN = cmbOrigin;
            this.bean.STATUS = "D";//String(CmbStatus.selectedItem.data);
            this.bean.COMBOCHANNEL = CombSource;
            this.bean.CHANNEL = CombChannel;
            this.bean.COUNTRY = txtcountry2;
            this.bean.CURRENCY = txtCurrency;

            this.bean.DATEFROM = '';
            this.bean.DATETO = '';
            this.bean.VP_TUORCODE = '';

        }
        this.bean.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;
        this.bean.VP_USER = txtAudit;
        this.bean.VP_TYPE = '';
        this.bean.VP_AREA = CombArea;
        this.bean.VP_EROOR = cmbError;
        this.SearchReportDispute(this.bean, obj === true ? obj : false);



    },
    SearchReportDispute: function (bean, bExcel) {
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.id + '-gridData').getStore().loadPage(1, {
                params: {
                    beanString: JSON.stringify(bean)
                            //beanString: bean

                }, callback: function (records, operation, success) {
                    if (records.length != 0) {
                        Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText(records[0].data.page.TOTROW);
                    } else {
                        Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });
        }



    },
    exportExcel: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    },
    onExcelClick: function (obj, e) {
        this.imgSearch_clickHandler(true);
    },
    onFilterClick: function () {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },

    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.DisputeGestionBsplink.DetailDisputeGestionBsplink({
            params: {
                rec: rec
            }
        });
        win.show();
    }
    /*onDetailClick: function(grid, rowIndex, colIndex) {  
     var rec = grid.getStore().getAt(rowIndex);
     var data = rec.data;
     var DetailDisputeGestion = Ext.create('Ext.Praxis.view.salesaudit.DisputeGestionBsplink.DetailDisputeGestionBsplink', {id: 'DetailBsplinkRefundQueryRFND'});
     var controller = DetailDisputeGestion.getController();
     controller.initial(data);
     DetailDisputeGestion.show();
     }*/
});

