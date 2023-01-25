
Ext.define('Ext.Praxis.controller.salesaudit.DisputemanagementMyarcForm.DisputemanagementMyarcFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DisputemanagementMyarcFormController',

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
        var me = this;
        me.setStores();
        me.setUser();
        me.setStoresFilters();
        Ext.getCmp(prototype.idDisputemanageMyarc + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, me);
        me.oninitSearch();

    },
    OnBeforeShow: function () {
        prototype.url02 = CONTEXTPATH + '/BwrBSPLINKRFND';
        prototype.idDisputeGestionMyarc = 'DetailDisputeGestionMyarc';
        prototype.url = CONTEXTPATH + '/DisputemanagementMyarcForm';
        prototype.idDisputemanageMyarc = 'DisputemanagementMyarcForm';
        prototype.idDisputeFileViewerMyarc = 'DisputeFileViewerMyarc';
        prototype.widthContenedor = 1366;
        prototype.heightContenedor = 768;

    },
    setUser: function () {
        var me = this;
        Ext.Ajax.request({
            url: prototype.url02 + '/getUser/',
            timeout: 60000000,
            method: 'POST',
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.idDisputemanageMyarc + '-Audit').setValue(Ext.String.trim(res.user.USR));
                me.imgSearch_clickHandler();
            }
        });
    },

    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idDisputemanageMyarc + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.idDisputemanageMyarc + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.idDisputemanageMyarc + '-pagginator-01').enable();
        }
    },
    oninitSearch: function () {
        Ext.getCmp(prototype.idDisputemanageMyarc + '-search-type').setValue('1');
        Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom').setVisible(true);
        Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').setVisible(true);
        Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboOrigin').setVisible(true);
        Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboArea').setVisible(true);
        Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboBase').setVisible(true);
        Ext.getCmp(prototype.idDisputemanageMyarc + '-CmbStatus').setValue('Y');
        Ext.getCmp(prototype.idDisputemanageMyarc + '-box-filter-02').setVisible(true);

        Ext.getCmp(prototype.idDisputemanageMyarc + '-iata').setVisible(false);
        Ext.getCmp(prototype.idDisputemanageMyarc + '-nmemo').setVisible(false);

        Ext.getCmp(prototype.idDisputemanageMyarc + '-iata').setValue('');
        Ext.getCmp(prototype.idDisputemanageMyarc + '-nmemo').setValue('');
        Ext.getCmp(prototype.idDisputemanageMyarc + '-CmbStatusMyArc').setValue('');



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

    //Se ejecuta luego de haber cargado todos los componentes

    onPagingBeforeChange01: function (obj, page, opts) {
        var store = obj.getStore();
        var totRow = store.getCount() !== 0 ? store.totalCount : 0;
        obj.store.proxy.extraParams = {
            beanString: JSON.stringify(this.bean),
            totRow: totRow
        };
    },
    setStores: function () {
        var grid00 = Ext.getCmp(prototype.idDisputemanageMyarc + '-gridData');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDisputemanageMyarc + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchReportMyarc/',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);

        Ext.getCmp(prototype.idDisputemanageMyarc + '-pagginator-01').setStore(store00);
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idDisputemanageMyarc + '-search-type');
        var cmbOrigin = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboOrigin');
        var cmbArea = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboArea');
        var cmbBase = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboBase');

        var CmbStatus = Ext.getCmp(prototype.idDisputemanageMyarc + '-CmbStatus');
        var CmbStatusMyArc = Ext.getCmp(prototype.idDisputemanageMyarc + '-CmbStatusMyArc');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "5", "name": "AGENCY"},
                {"code": "2", "name": "MEMO NUMBER"},
                {"code": "4", "name": "PROCESSING DATE"},
                {"code": "1", "name": "SYSTEM DATE"}
            ]
        }));

        cmbBase.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "PR", "name": "AUTOMATIC"},
                {"code": "MA", "name": "MANUAL"},
                {"code": "MS", "name": "MASSIVE"},
                {"code": "QR", "name": "QUERYS"},
                {"code": "UP", "name": "UPFRONT"}

            ]
        }));

        cmbArea.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "CR", "name": "CREDITO Y COBRANZAS"},
                {"code": "VI", "name": "VENTA INDIRECTA"},
                {"code": "CM", "name": "COMMISIONES"}
            ]
        }));

        CmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "Y", "name": "PENDING TO WORK"},
                {"code": "P", "name": "PENDING SEND"},
                {"code": "B", "name": "SENT TO MYARC"},
                {"code": "E", "name": "ERROR SENDING TO MYARC"},
                {"code": "T", "name": "DISPUTE ENDED"}
            ]
        }));

        CmbStatusMyArc.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "WA", "name": "ACCEPTED DISPUTE"},
                {"code": "DE", "name": "DISPUTED"},
                {"code": "DE", "name": "REJECTED DISPUTE"}

            ]
        }));

        cmbOrigin.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "PR", "name": "PRAXIS"},
                {"code": "EX", "name": "EXTERNAL"}
            ]
        }));


    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('1');
    },
    onCmbOriginAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbAreaAfterRender: function (obj) {
        obj.setValue('');
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A4137FLAG'))) {
            case 'DI':
                color = '#FF9966';
                value = 'Disputed';
                break;
            case 'DE':
                color = '#F78181';
                value = 'Rejected dispute';
                break;
            case 'WA':
                color = '#F3EFB6';
                value = 'Approved dispute';
                break;

                //{"code": "G", "name": "POST BILLING"},
        }

        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    onCmbSearchSelect: function (obj, records, eOpts) {
        var txtFilterDateFrom = Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo');
        var CmbOrigin = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboOrigin');
        var cmbBase = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboBase');
        var CmbArea = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboArea');
        var filter = Ext.getCmp(prototype.idDisputemanageMyarc + '-box-filter-02');

        var txtiata = Ext.getCmp(prototype.idDisputemanageMyarc + '-iata');
        var txtnmemo = Ext.getCmp(prototype.idDisputemanageMyarc + '-nmemo');

        switch (String(obj.getValue())) {
            case '1':
            case '4':


                txtFilterDateFrom.show();
                txtFilterDateTo.show();
                CmbOrigin.show();
                CmbArea.show();
                filter.show();
                cmbBase.show();

                txtiata.hide();
                txtnmemo.hide();

                Ext.getCmp(prototype.idDisputemanageMyarc + '-iata').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-nmemo').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboOrigin').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboBase').setValue('');
                break;
            case '2':
                txtnmemo.show();

                txtFilterDateFrom.hide();
                txtFilterDateTo.hide();
                CmbOrigin.hide();
                cmbBase.hide();
                CmbArea.hide();
                filter.hide();
                txtiata.hide();

                Ext.getCmp(prototype.idDisputemanageMyarc + '-iata').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboOrigin').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboArea').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboBase').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-Audit').setValue('');
                break;
            case '5':

                txtiata.show();
                CmbOrigin.show();
                CmbArea.show();
                cmbBase.show();

                txtnmemo.hide();
                txtFilterDateFrom.hide();
                txtFilterDateTo.hide();
                CmbArea.hide();
                filter.hide();

                Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-nmemo').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-Audit').setValue('');
                break;
            case '':
                txtiata.hide();
                CmbOrigin.hide();
                CmbArea.hide();

                txtnmemo.hide();
                txtFilterDateFrom.hide();
                txtFilterDateTo.hide();
                CmbArea.hide();
                filter.hide();
                cmbBase.hide();

                Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboOrigin').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboArea').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-nmemo').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-Audit').setValue('');
                break;
                // boxFilter02.hide();
                // boxFilter02.setBorder(false)
        }
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    imgSearch_clickHandler: function (obj, records, eOpts) {
        var me = this;
        var cmbsearch = Ext.getCmp(prototype.idDisputemanageMyarc + '-search-type').getValue();
        var txtDateFrom = Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom').getRawValue();
        var txtDateTo = Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').getRawValue();
        var txtIata = Ext.getCmp(prototype.idDisputemanageMyarc + '-iata').getValue();
        var cmbOrigin = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboOrigin').getValue();
        var CombArea = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboArea').getValue();
        var txtnmemo = Ext.getCmp(prototype.idDisputemanageMyarc + '-nmemo').getValue();
        var txtAudit = Ext.getCmp(prototype.idDisputemanageMyarc + '-Audit').getValue();
        var CmbStatus = Ext.getCmp(prototype.idDisputemanageMyarc + '-CmbStatus').getValue();
        var ComboBase = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboBase').getValue();
        var CmbStatusMyArc = Ext.getCmp(prototype.idDisputemanageMyarc + '-CmbStatusMyArc').getValue();
        if (cmbsearch === '') {
            Ext.MessageBox.alert('PRAXIS', "Select Search Type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idDisputemanageMyarc + '-search-type').focus();", 100);
            });
            return;
        }
        if (txtDateFrom !== '' && txtDateTo !== '') {

            if (global.existeFecha(txtDateFrom) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtDateFrom), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom').focus();", 100);
                });
                return;
            }

            if (global.existeFecha(txtDateTo) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtDateTo), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
            if (Date.parse(Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom').getValue()) > Date.parse(Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').getValue())) {
                Ext.MessageBox.alert('PRAXIS', "the starting date must be less than the end date", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
        }

        if (cmbsearch === "2") {

            me.bean.IN_OPTION = cmbsearch;
            me.bean.IN_NUMBERADM = txtnmemo;
            me.bean.IN_DATEFROM = '';
            me.bean.IN_DATETO = '';
            me.bean.IN_STATUS = '';
            me.bean.IN_FLAG = '';
            me.bean.IN_IATA = '';
            me.bean.IN_BASE = '';
            me.bean.IN_ORIGEN = '';
        } else if (cmbsearch === "1" || cmbsearch === "4") {

            me.bean.IN_OPTION = cmbsearch;
            me.bean.IN_DATEFROM = txtDateFrom;
            me.bean.IN_DATETO = txtDateTo;
            me.bean.IN_ORIGEN = cmbOrigin;
            me.bean.IN_BASE = ComboBase;
            me.bean.IN_STATUS = CmbStatus;
            me.bean.IN_FLAG = CmbStatusMyArc;
            me.bean.IN_IATA = '';
            me.bean.IN_NUMBERADM = '';

        } else if (cmbsearch === "5") {
            me.bean.IN_NUMBERADM = '';
            me.bean.IN_OPTION = cmbsearch;
            me.bean.IN_IATA = txtIata;
            me.bean.IN_ORIGEN = '';
            me.bean.IN_BASE = ComboBase;
            me.bean.IN_STATUS = '';
            me.bean.IN_FLAG = '';

            me.bean.IN_DATEFROM = '';
            me.bean.IN_DATETO = '';

        }
        me.bean.pexcel = Ext.getCmp(prototype.idDisputemanageMyarc + '-pagination').getValue() ? 0 : 1;
        me.bean.IN_USER = txtAudit;
        me.bean.IN_TYPE = '';
        me.bean.IN_AREA = CombArea;


        me.SearchReportDispute(me.bean, obj === true ? obj : false);



    },
    SearchReportDispute: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idDisputemanageMyarc + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.idDisputemanageMyarc + '-gridData').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        Ext.getCmp(prototype.idDisputemanageMyarc + '-lblRowsTotalADM').setText(records[0].data.page.TOTROW);
                    } else {
                        Ext.getCmp(prototype.idDisputemanageMyarc + '-lblRowsTotalADM').setText('0');
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
        var option = Ext.getCmp(prototype.idDisputemanageMyarc + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },

    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.DisputemanagementMyarcForm.DetailDisputeGestionMyarc({
            params: {
                rec: rec
            }
        });
        win.show();
    }
});



