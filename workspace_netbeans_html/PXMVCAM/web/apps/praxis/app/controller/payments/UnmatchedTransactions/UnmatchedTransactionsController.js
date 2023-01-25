/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.UnmatchedTransactions.UnmatchedTransactionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.UnmatchedTransactionsController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    reg99: 0,
    me: '',
    searchParams: {},
    paramsDetail: {},
    dataObtain: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'UnmatchedTransactionsForm';
        prototype.url = CONTEXTPATH + '/UnmatchedTransactions';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#UnmatchedTransactionsForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#UnmatchedTransactionsForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#UnmatchedTransactionsForm-btnClear': {
                click: this.btnClear_click
            },
            '#UnmatchedTransactionsForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#UnmatchedTransactionsForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#UnmatchedTransactionsForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#UnmatchedTransactionsForm-btnBack': {
                click: this.btnBack_click
            },
            '#UnmatchedTransactionsForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#UnmatchedTransactionsForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#UnmatchedTransactionsForm-btn-pag-next': {
                click: this.pagNext
            },
            '#UnmatchedTransactionsForm-btn-pag-last': {
                click: this.pagLast
            }
        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },

    cbxDateFromYear_changeHandler: function () {
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
    },
    cbxDateFromMonth_changeHandler: function () {
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
    },
    gridData_act1_clickHandler: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.strTicket;
//        console.log(strTkt);
        
        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(8, 7);
        beanProMasterTicket.IN_SEQ = '00';
        
//        this.NPROG = 'PX00000297'
        prototypeProgram.view = 'payments-unmatched-transactions-form';
        prototypeProgram.nprog = 'PX00000297';
        prototypeProgram.title = 'Unmatched Transactions';
//        prototypeProgram.modulo = 'PAYMENTS CONTROL';
        
        win.displayProMasterTicket(this, 'Unmatched', beanProMasterTicket);
    },
    
    cmbTranType_changeHandler: function () {
        var rad = Ext.getCmp(prototype.id + '-rbgType').getValue().rbgType;
        
        switch(rad){
            case 'Sales':
                Ext.getCmp(prototype.id + '-lblFechaFiltro').setText('Sales Date');
                break;
                    
            case 'Refund':
                Ext.getCmp(prototype.id + '-lblFechaFiltro').setText('Refund Date');
                break;
        }
        me.btnSearch_click();
    },
    cmbPhase_changeHandler: function () {
        
        var phase = Ext.getCmp(prototype.id + '-cmbPhase').getValue();
        switch(phase){
		case '1':
                    var cmbSTVAL = Ext.getCmp(prototype.id + '-cmbSTVAL');                       
                    cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
                        autoLoad: false,
                        fields: ['code', 'name'],
                        data: [
                            ["", "All"],
                            ["2", "Sales Without ACCB"],
                            ["3", "ACCB Without Sales"],
                            ["D", "Duplicate Tickets"]
                        ]
                    }));
                    cmbSTVAL.setValue("");

                    Ext.getCmp(prototype.id + '-boxVenta').show();
                    Ext.getCmp(prototype.id + '-lblFechaFiltro').setText('Sales Date');
                    Ext.getCmp(prototype.id + '-lblFechaFiltro').setVisible(true);
                    break;
                        
		case '2':
                    
                    var cmbSTVAL = Ext.getCmp(prototype.id + '-cmbSTVAL');
                    cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
                        autoLoad: false,
                        fields: ['code', 'name'],
                        data: [
                            ["", "All"],
                            ["2", "Settlement Without Paying"],
                            ["3", "Paying Without Settlement"],
                            ["D", "Duplicate Tickets"]
                        ]
                    }));
                    cmbSTVAL.setValue("");

                    Ext.getCmp(prototype.id + '-txtTicket').setValue('');
                    Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                    Ext.getCmp(prototype.id + '-cmbFOP').setValue('');
                    Ext.getCmp(prototype.id + '-cmbSource').setValue('');
                    Ext.getCmp(prototype.id + '-boxVenta').hide();
                    Ext.getCmp(prototype.id + '-lblFechaFiltro').setText('Transaction Date');
                    Ext.getCmp(prototype.id + '-lblFechaFiltro').setVisible(true);
                    break;
                        
                case '3':
                    
                    var cmbSTVAL = Ext.getCmp(prototype.id + '-cmbSTVAL');
                    cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
                        autoLoad: false,
                        fields: ['code', 'name'],
                        data: [
                            ["", "All"],
                            ["2", "Bank Without Payment"],
                            ["3", "Payment Without Bank"],
                        ]
                    }));
                    cmbSTVAL.setValue("");

                    Ext.getCmp(prototype.id + '-boxVenta').hide();
                    Ext.getCmp(prototype.id + '-lblFechaFiltro').setText('Sale Date');
                    Ext.getCmp(prototype.id + '-lblFechaFiltro').setVisible(true);
                    break;        
	}
        
//        me.btnSearch_click();
    },
    
    obtainData: function () {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');

        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');

        var cmbPhase = Ext.getCmp(prototype.id + '-cmbPhase');
        cmbPhase.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "I  : By Ticket"],
                ["2", "II : By Credit Card"],
                ["3", "II : By Pending Payment"]
            ]
        }));
        cmbPhase.setValue("1");

        var cmbSTVAL = Ext.getCmp(prototype.id + '-cmbSTVAL');
        cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["2", "Sales Without ACCB"],
                ["3", "ACCB Without Sales"],
                ["D", "Duplicate Tickets"]
            ]
        }));
        cmbSTVAL.setValue("");

        var cmbFOP = Ext.getCmp(prototype.id + '-cmbFOP');
        cmbFOP.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["CC", "Credit Card"],
                ["CA", "Cash"]
            ]
        }));
        cmbFOP.setValue("CC");

        var cmbSource = Ext.getCmp(prototype.id + '-cmbSource');
        cmbSource.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["B", "BSP"],
                ["S", "ASR"],
                ["A", "ARC"]
            ]
        }));
        cmbSource.setValue("");


        this.dataObtain.CARD = 2;
        this.dataObtain.COUNTRY = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
//            beforerequest: Ext.getCmp(prototype.id + '-panelGridData').mask('Loading...'),
            params: {
                beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
//                Ext.getCmp(prototype.id + '-panelGridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var lstCard = res.lstCard;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstCard,
                    autoLoad: true
                });
                var lstCountry = res.lstCountry;
                var storeData2 = Ext.create('Ext.data.Store', {
                    data: lstCountry,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCardType').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbCardType').setValue('');
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData2);
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

                me.btnSearch_click();
            }
        });

    },
    setFormatParameter: function () {
        me.bean = {};

        me.bean.strYearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        me.bean.strMonthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.strYearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        me.bean.strMonthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();

        var option = Ext.getCmp(prototype.id + '-rbgType').getValue();

        switch (option.rbgType) {
            case 'Sales':
                me.bean.IN_TDOC = 'S';
                break;
            case 'Refund':
                me.bean.IN_TDOC = 'R';
                break;
        }
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_PAYMENT = Ext.getCmp(prototype.id + '-cmbFOP').getValue();
        me.bean.IN_CARDC = Ext.getCmp(prototype.id + '-cmbCardType').getValue();
        me.bean.IN_TICKET = Ext.getCmp(prototype.id + '-txtTicket').getValue();
        me.bean.IN_CARDN = Ext.getCmp(prototype.id + '-txtCard').getValue();
        me.bean.IN_FTE = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        me.bean.IN_MERCHN = Ext.getCmp(prototype.id + '-txtMERCHN').getValue();
        me.bean.IN_STVAL = Ext.getCmp(prototype.id + '-cmbSTVAL').getValue();
        me.bean.IN_PHASE = Ext.getCmp(prototype.id + '-cmbPhase').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
//        console.log(searchParams);

        var chkCon = Ext.getCmp(prototype.id + '-chkControl').getValue();
        var phase = Ext.getCmp(prototype.id + '-cmbPhase').getValue();

        if (chkCon) {
            this.searchTktControl();
        } else {
            switch (phase) {
                case '1':
                    //Fase 1 = Conciliación de la Venta
                    this.searchDetTicket();
                    break;
                case '2':
                    //Fase 2 = Conciliación Bancaria
                    this.searchBank();
                    break;
                case '3':
                    //Fase 3 = Conciliación EECC
                    this.searchDetMerchant();
                    break;
            }
        }
    },
    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
    },

    searchDetTicket: function () {
//        win.lblUser_toolTip("Estructura: A2290");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj});
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetTicket'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },

                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();

                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            
                            var data = obj.data.items[0].data;
                                if(data.IN_STVAL = 'D'){
                                    win.lblUser_toolTip("Estructura: A2271");
                                }else{
                                    win.lblUser_toolTip("Estructura: A2290");
                                }
                            Ext.getCmp(prototype.id + '-lblTotS_SVFOP').setText(Ext.util.Format.number(data.dblTotSVFOP, '0,000'));
                        }
                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetTicket').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    searchBank: function () {
        win.lblUser_toolTip("Estructura: A2291");
        me.panelActual = '-boxDetCardNbr';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchBank'
                }, listeners: {
                    beforeload: function (obj) {

                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
//                        console.log(searchParams);
                        obj.proxy.extraParams = searchParams;
                    },

                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
//                        console.log(obj.data);
                        var pag = Ext.getCmp(prototype.id + '-paggin2');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
//                              me.dataGrid = obj.data;
                            var data = obj.data.items[0].data;

                            Ext.getCmp(prototype.id + '-lblTotBS_SVFOP').setText(Ext.util.Format.number(data.dblTotSVFOP, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotBS_QTYDOC').setText(Ext.util.Format.number(data.lngTotQTYDOC, '0,000'));
                        }
                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetCardNbr').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    searchDetMerchant: function () {
        win.lblUser_toolTip("Estructura: A2292");
        me.panelActual = '-boxDetMerchant';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetMerchant'
                }, listeners: {
                    beforeload: function (obj) {

                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },

                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
//                        console.log(obj.data);
                        var pag = Ext.getCmp(prototype.id + '-paggin3');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
//                              me.dataGrid = obj.data;
                            var data = obj.data.items[0].data;

                            Ext.getCmp(prototype.id + '-lblTotBS_SVFOP').setText(Ext.util.Format.number(data.dblTotSVFOP, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotBS_QTYDOC').setText(Ext.util.Format.number(data.lngTotQTYDOC, '0,000'));
                        }
                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetMerchant').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        }
    },
    searchTktControl: function () {
        win.lblUser_toolTip("Estructura: A2290,A1530,A1531");
        me.panelActual = '-boxControl';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        me.setWidthPie();
        var msj = this.validateFields();

        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchTktControl'
                }, listeners: {
                    beforeload: function (obj) {
                        
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
//                        console.log(searchParams);
                        obj.proxy.extraParams = searchParams;
                    },

                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
//                        console.log(obj.data);
                        
                        var pag = Ext.getCmp(prototype.id + '-paggin4');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
//                              me.dataGrid = obj.data;
//                            var data = obj.data.items[0].data;
//
//                            Ext.getCmp(prototype.id + '-lblTotBS_SVFOP').setText(Ext.util.Format.number(data.dblTotSVFOP, '0,000'));
//                            Ext.getCmp(prototype.id + '-lblTotBS_QTYDOC').setText(Ext.util.Format.number(data.lngTotQTYDOC, '0,000'));
                        }
                        me.setWidthPie();
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridControl').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
        }
    },

    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function () {
//        this.winDataEntry('I');
    },
//    onEditClick: function(grid, rowIndex, colIndex) {
//        var rec = grid.getStore().getAt(rowIndex);
//        this.winDataEntry('U', rec);
//    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.payments.UnmatchedTransactionsForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
            }
        }).show();
    },

    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.setWidthPie();
            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbPhase').setValue('1');
        Ext.getCmp(prototype.id + '-cmbSTVAL').setValue('');
        Ext.getCmp(prototype.id + '-cmbCardType').setValue('');
        Ext.getCmp(prototype.id + '-txtCard').setValue('');
        Ext.getCmp(prototype.id + '-txtMERCHN').setValue('');
        Ext.getCmp(prototype.id + '-txtTicket').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
        Ext.getCmp(prototype.id + '-cmbFOP').setValue('');
        Ext.getCmp(prototype.id + '-cmbSource').setValue('');

    },
    btnExcel_click: function (obj, e) {

        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function () {
        
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            case  '-boxDetCardNbr':
                global.getFile(prototype.url + '/getXLSX_Card?beanString=' + searchParams.beanString);
                break;
            case  '-boxControl':
                global.getFile(prototype.url + '/getXLSX_Control?beanString=' + searchParams.beanString);
                break;
        }

    },
    
    btnFilter_click: function (obj) {

        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {
//        switch (me.panelActual) {
//            case  '-panelGridData':
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case '-boxDetCardNbr':
                me.pagginActual = '-paggin2';
                break;
            case '-boxDetMerchant':
                me.pagginActual = '-paggin3';
                break;
            case '-boxControl':
                me.pagginActual = '-paggin4';
                break;
        }
    },
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        obj.setValue('01');
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    
    /*     
     * Funciones para la paginacion     
     */

    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },

    getInt: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }

}
);