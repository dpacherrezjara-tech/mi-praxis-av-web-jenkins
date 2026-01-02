Ext.define('Ext.Praxis.controller.payments.DuplicateSettlements.DuplicateSettlementsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DuplicateSettlementsController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanDelete: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    reg99: 0,
    error: '',
    Fuente: '',
    me: '',
    searchParams: {},
    searchParamsDelete: {},
    paramsObtainData: {},
    lstSettlement: [],
    paramsDetail: {},
    dataObtain: {},
    lst: [],
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'DuplicateSettlementsForm';
        prototype.url = CONTEXTPATH + '/DuplicateSettlements';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#DuplicateSettlementsForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#DuplicateSettlementsForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#DuplicateSettlementsForm-btnClear': {
                click: this.btnClear_click
            },
            '#DuplicateSettlementsForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#DuplicateSettlementsForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#DuplicateSettlementsForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#DuplicateSettlementsForm-btnBack': {
                click: this.btnBack_click
            },
            '#DuplicateSettlementsForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#DuplicateSettlementsForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#DuplicateSettlementsForm-btn-pag-next': {
                click: this.pagNext
            },
            '#DuplicateSettlementsForm-btn-pag-last': {
                click: this.pagLast
            },
            '#DuplicateSettlementsForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth
            },
            '#DuplicateSettlementsForm-cmbYear': {
                afterrender: this.afterRenderYear
            },
            '#DuplicateSettlementsForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#DuplicateSettlementsForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#DuplicateSettlementsForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
        this.btnSearch_click();
    },
    obtainData: function () {
        var yesterday = new Date();

        var month = yesterday.getMonth() + 1;
        var day = yesterday.getDate();
        var year = yesterday.getFullYear();
        
        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        var storeComboDataYear = me.getStoreYearBank(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(year);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);

        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(year);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);

        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('01');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('01');

        Ext.getCmp(prototype.id + '-cmbDateFromYearRemoved').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthRemoved').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDayRemoved').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYearRemoved').setValue(year);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthRemoved').setValue(month);

        Ext.getCmp(prototype.id + '-cmbDateToYearRemoved').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonthRemoved').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDayRemoved').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYearRemoved').setValue(year);
        Ext.getCmp(prototype.id + '-cmbDateToMonthRemoved').setValue(month);

        Ext.getCmp(prototype.id + '-cmbDateToDayRemoved').setValue('01');
        Ext.getCmp(prototype.id + '-cmbDateFromDayRemoved').setValue('01');

        var cmbNEGOC = Ext.getCmp(prototype.id + '-cmbNEGOC');
        cmbNEGOC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "PASAJES"],
                ["2", "CARGO"],
                ["3", "CORREO"],
                ["S", "STANDBY"],
            ]
        }));
        cmbNEGOC.setValue("1");

        this.paramsObtainData.CARD = 2;
        this.paramsObtainData.IN_PF122CODPR = 2;
        this.paramsObtainData.COUNTRY = 2;

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {

                    me.lstCard = res.lstCard;
                    me.lstProcessor = res.listaProcesadores;
                    me.lstCountry = res.lstCountry;

                    var storeData1 = Ext.create('Ext.data.Store', {
                        data: me.lstCard,
                        autoLoad: true
                    });

                    var storeData2 = Ext.create('Ext.data.Store', {
                        data: me.lstProcessor,
                        autoLoad: true
                    });

                    var storeData3 = Ext.create('Ext.data.Store', {
                        data: me.lstCountry,
                        autoLoad: true
                    });

                    Ext.getCmp(prototype.id + '-cmbProcessor').bindStore(storeData2);
                    Ext.getCmp(prototype.id + '-cmbProcessor').setValue('');

                    Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                    Ext.getCmp(prototype.id + '-cmbCountry').setValue('');


                } else
                    global.clear();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    changeView: function () {
        var seg = Ext.getCmp(prototype.id + '-segViewMode');
        var value = seg.getValue();
        me.drillDown = [];

        if (value === 0) {
            Ext.getCmp(prototype.id + '-panelGridData').setVisible(true);
            Ext.getCmp(prototype.id + '-panelGridDataDeleteGroup').setVisible(false);
            Ext.getCmp(prototype.id + '-panelGridDataDeleted').setVisible(false);
            Ext.getCmp(prototype.id + '-panelDuplicates').setVisible(true);
            Ext.getCmp(prototype.id + '-panelRemoved').setVisible(false);
        } else {
            Ext.getCmp(prototype.id + '-panelGridData').setVisible(false);
            Ext.getCmp(prototype.id + '-panelGridDataDeleteGroup').setVisible(true);
            Ext.getCmp(prototype.id + '-panelDuplicates').setVisible(false);
            Ext.getCmp(prototype.id + '-panelRemoved').setVisible(true);
        }
        this.getPaggin();
    },
    btnSearch_click: function (obj, e) {
        var seg = Ext.getCmp(prototype.id + '-segViewMode');
        var value = seg.getValue();
        me.lstSettlement = [];
        me.beanDelete = {};

        if (value === 0) {
            this.setFormatParameter();
            this.setGridData();
        } else {
            this.setFormatParameterDeleteGroup();
            this.setGridDataDeleteGroup();
        }
    },
    setFormatParameter: function () {
        me.bean = {};
        me.bean.IN_FECHA_FROM = (Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() || '') + (Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue() || '');
        me.bean.IN_FECHA_TO = (Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() || '') + (Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() || '');
        me.bean.IN_CCUST = Ext.getCmp(prototype.id + '-typeClient').getValue() || '';
        me.bean.IN_PROCESSOR = Ext.getCmp(prototype.id + '-cmbProcessor').getValue() || '';
        me.bean.IN_STATUS = Ext.getCmp(prototype.id + '-cmbStatus').getValue() || '';
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() || '';
        me.bean.IN_NEGOC = Ext.getCmp(prototype.id + '-cmbNEGOC').getValue() || '';
        me.bean.IN_CODEBANK = Ext.getCmp(prototype.id + '-txtCodeBank').getValue() || '';
        me.bean.IN_SEQ = Ext.getCmp(prototype.id + '-txtSecuence').getValue() || '';
        me.bean.IN_SCARCOD = Ext.getCmp(prototype.id + '-txtCardType').getValue() || '';
        me.bean.IN_FASE2 = Ext.getCmp(prototype.id + '-cmbFase2').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
        console.log(searchParams, 'searchParams')
    },
    setGridData: function () {
        me.beanDelete = {};
        me.lstSettlement = [];
        win.lblUser_toolTip("Estructura: MPF060");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        console.log(data);
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();

                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    markSettlement: function (column, rowIndex, checked, record) {
        let settlement = record.data;

        if (checked && settlement.FSELEC && settlement.FSELEC.toString().trim() !== '') {
            Ext.Msg.alert(
                    "Aviso",
                    "Este registro ya fue procesado en Fase 2 y no puede ser modificado."
                    );
            record.set('checkActive', false);
            return;
        }

        if (checked && parseInt(settlement.STVAL, 10) !== 3) {
            Ext.Msg.alert("Aviso", "Solo se pueden seleccionar registros con STVAL = 3");
            record.set('checkActive', false);
            return;
        }

        if (checked) {
            me.lstSettlement.push({
                CCUST: settlement.CCUST,
                SDATE: settlement.SDATE,
                SCOUNTRY: settlement.SCOUNTRY,
                TDOC: settlement.TDOC,
                CODEBANK: settlement.CODEBANK,
                SCARCOD: settlement.SCARCOD,
                SCARDN: settlement.SCARDN,
                SAUTHOC: settlement.SAUTHOC,
                SEQ: settlement.SEQ,
                SVFOP: settlement.SVFOP
            });
        } else {
            // Si se desmarca, filtrar lista
            me.lstSettlement = me.lstSettlement.filter(item => !(
                        item.CCUST === settlement.CCUST &&
                        item.SDATE === settlement.SDATE &&
                        item.SCOUNTRY === settlement.SCOUNTRY &&
                        item.TDOC === settlement.TDOC &&
                        item.CODEBANK === settlement.CODEBANK &&
                        item.SCARCOD === settlement.SCARCOD &&
                        item.SCARDN === settlement.SCARDN &&
                        item.SAUTHOC === settlement.SAUTHOC &&
                        item.SEQ === settlement.SEQ &&
                        item.SVFOP === settlement.SVFOP
                        ));
        }

        console.log(me.lstSettlement, 'LLENADO');
    },
    confirmSettlementsSelected: function () {
        if (!me.lstSettlement.length) {
            global.Msg({
                msg: 'No ha seleccionado ningun registro.'
            });
            return
        }

        Ext.Msg.show({
            title: 'Confirmación',
            message: '¿Está seguro que desea eliminar los registros seleccionados?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.WARNING,
            fn: function (btn) {
                if (btn === 'yes') {
                    me.deleteSettlementsSelected()
                }
            }
        });
    },
    confirmAllSettlementsSelected: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            message: '¿Está seguro que desea eliminar todos los registros de la grilla?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.WARNING,
            fn: function (btn) {
                if (btn === 'yes') {
                    me.deleteAllSettlements()
                }
            }
        });
    },
    deleteSettlementsSelected: function () {
        me.beanDelete = {};
        me.beanDelete.IN_FECHA_FROM = (Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() || '') + (Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue() || '');
        me.beanDelete.IN_FECHA_TO = (Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() || '') + (Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() || '');
        me.beanDelete.IN_CCUST = Ext.getCmp(prototype.id + '-typeClient').getValue() || '';
        me.beanDelete.IN_PROCESSOR = Ext.getCmp(prototype.id + '-cmbProcessor').getValue() || '';
        me.beanDelete.IN_STATUS = Ext.getCmp(prototype.id + '-cmbStatus').getValue() || '';
        me.beanDelete.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() || '';
        me.beanDelete.IN_NEGOC = Ext.getCmp(prototype.id + '-cmbNEGOC').getValue() || '';
        me.beanDelete.IN_CODEBANK = Ext.getCmp(prototype.id + '-txtCodeBank').getValue() || '';
        me.beanDelete.IN_SEQ = Ext.getCmp(prototype.id + '-txtSecuence').getValue() || '';
        me.beanDelete.IN_SCARCOD = Ext.getCmp(prototype.id + '-txtCardType').getValue() || '';
        me.beanDelete.IN_MASSIVE = 'N';

        me.searchParamsDelete = {
            beanString: JSON.stringify(me.beanDelete),
            beanSettlements: JSON.stringify(me.lstSettlement)
        };

        console.log(me.searchParamsDelete, 'searchParamsConciliation');

        me.sendDeleteSettlements(me.searchParamsDelete, function (responseData) {
            console.log(responseData);
        });
    },
    deleteAllSettlements: function () {
        me.beanDelete = {};
        me.beanDelete.IN_FECHA_FROM = (Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() || '') + (Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue() || '');
        me.beanDelete.IN_FECHA_TO = (Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() || '') + (Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() || '');
        me.beanDelete.IN_CCUST = Ext.getCmp(prototype.id + '-typeClient').getValue() || '';
        me.beanDelete.IN_PROCESSOR = Ext.getCmp(prototype.id + '-cmbProcessor').getValue() || '';
        me.beanDelete.IN_STATUS = Ext.getCmp(prototype.id + '-cmbStatus').getValue() || '';
        me.beanDelete.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() || '';
        me.beanDelete.IN_NEGOC = Ext.getCmp(prototype.id + '-cmbNEGOC').getValue() || '';
        me.beanDelete.IN_CODEBANK = Ext.getCmp(prototype.id + '-txtCodeBank').getValue() || '';
        me.beanDelete.IN_SEQ = Ext.getCmp(prototype.id + '-txtSecuence').getValue() || '';
        me.beanDelete.IN_SCARCOD = Ext.getCmp(prototype.id + '-txtCardType').getValue() || '';
        me.beanDelete.IN_MASSIVE = 'Y';

        me.searchParamsDelete = {
            beanString: JSON.stringify(me.beanDelete),
            beanSettlements: JSON.stringify(me.lstSettlement)
        };

        me.sendDeleteSettlements(me.searchParamsDelete, function (responseData) {
            console.log(responseData);
        });
        console.log(me.searchParamsDelete, 'searchParamsConciliation');
    },
    sendDeleteSettlements: function (params, callback) {
        Ext.Ajax.request({
            url: prototype.url + '/sendDeleteSettlements',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: params.beanString, beanSettlements: params.beanSettlements},
            beforerequest: Ext.getCmp(prototype.id + '-panelMain').mask('Loading...'),
            success: function (response, options) {

                Ext.getCmp(prototype.id + '-panelMain').unmask('Loading...');
                let res = Ext.JSON.decode(response.responseText);
                console.log(res, 'res');

                if (res.success) {
                    global.Msg({msg: res.result});
                    me.btnSearch_click();
                } else {
                    global.Msg({msg: res.result});
                    callback(res);
                }
            },
            failure: function (response, options) {
                Ext.getCmp(prototype.id + '-panelMain').unmask('Loading...');
                console.error("Error en la petición AJAX");
                global.Msg({msg: "Error al obtener datos"});
            }
        });
    },
    setFormatParameterDeleteGroup: function () {
        me.bean = {};
        me.bean.IN_FECHA_FROM =
                (Ext.getCmp(prototype.id + '-cmbDateFromYearRemoved').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateFromMonthRemoved').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateFromDayRemoved').getValue() || '');
        me.bean.IN_FECHA_TO =
                (Ext.getCmp(prototype.id + '-cmbDateToYearRemoved').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateToMonthRemoved').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateToDayRemoved').getValue() || '');
        me.bean.IN_CCUST = Ext.getCmp(prototype.id + '-typeClientRemoved').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
        console.log(searchParams, 'searchParamsDeleteGroup')
    },
    setGridDataDeleteGroup: function () {
        win.lblUser_toolTip("Estructura: MPF060");
        me.panelActual = '-panelGridDataDeleteGroup';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDelete'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        console.log(data);
                        var pag = Ext.getCmp(prototype.id + '-paggin2');
                        var pagData = pag.getPageData();

                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMainDataDeleteGroup').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    onClickDetailRemoved: function (cmp, cpm2, numRow, numCol, cpm3, rowData) {
        const me = this;
        const data = rowData?.data || {};

        me.paramsDetail = {};
        me.paramsDetail.IN_CCUST = data.CCUST || '';
        me.paramsDetail.IN_USUP = data.USUP || '';
        me.paramsDetail.IN_FEUP = data.FEUP || '';
        me.paramsDetail.IN_HOUP = data.HOUP || '';
        me.paramsDetail.IN_PGMUP = data.PGMUP || '';

        me.paramsDetail.beanString = JSON.stringify(me.paramsDetail);
        me.setGridDataDetailRemoved();
    },
    setGridDataDetailRemoved: function () {
        win.lblUser_toolTip("Estructura: MPF060");
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDeleted';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        console.log("paramsDetail:", me.paramsDetail);

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDeleteDetail'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin3');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMainDataDelete').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    markSettlementReverse: function (column, rowIndex, checked, record) {
        let settlement = record.data;

        if (checked) {
            me.lstSettlement.push({
                CCUST: settlement.CCUST,
                SDATE: settlement.SDATE,
                SCOUNTRY: settlement.SCOUNTRY,
                TDOC: settlement.TDOC,
                CODEBANK: settlement.CODEBANK,
                SCARCOD: settlement.SCARCOD,
                SCARDN: settlement.SCARDN,
                SAUTHOC: settlement.SAUTHOC,
                SEQ: settlement.SEQ,
                SVFOP: settlement.SVFOP,
                USUP: settlement.USUP,
                FEUP: settlement.FEUP,
                HOUP: settlement.HOUP,
                PGMUP: settlement.PGMUP,
            });
        } else {
            // Si se desmarca, filtrar lista
            me.lstSettlement = me.lstSettlement.filter(item => !(
                        item.CCUST === settlement.CCUST &&
                        item.SDATE === settlement.SDATE &&
                        item.SCOUNTRY === settlement.SCOUNTRY &&
                        item.TDOC === settlement.TDOC &&
                        item.CODEBANK === settlement.CODEBANK &&
                        item.SCARCOD === settlement.SCARCOD &&
                        item.SCARDN === settlement.SCARDN &&
                        item.SAUTHOC === settlement.SAUTHOC &&
                        item.SEQ === settlement.SEQ &&
                        item.SVFOP === settlement.SVFOP &&
                        item.USUP === settlement.USUP &&
                        item.FEUP === settlement.FEUP &&
                        item.HOUP === settlement.HOUP &&
                        item.PGMUP === settlement.PGMUP
                        ));
        }

        console.log(me.lstSettlement, 'LLENADO');
    },
    confirmAllSettlementsSelectedReverse: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            message: '¿Está seguro que desea habilitar nuevamente todos los registros de la grilla?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.WARNING,
            fn: function (btn) {
                if (btn === 'yes') {
                    me.reverseAllSettlements()
                }
            }
        });
    },
    confirmSettlementsSelectedReverse: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            message: '¿Está seguro que desea habilitar nuevamente los registros seleccionados de la grilla?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.WARNING,
            fn: function (btn) {
                if (btn === 'yes') {
                    me.reverseSettlementsSelected()
                }
            }
        });
    },
    reverseAllSettlements: function () {
        me.beanDelete = {};

        var grid = Ext.getCmp(prototype.id + '-gridMainDataDelete');
        var store = grid.getStore();

        if (!store || store.getCount() === 0) {
            global.Msg({
                msg: 'No existen registros para procesar.'
            });
            return;
        }

        var firstRecord = store.getAt(0);

        me.beanDelete.IN_FECHA_FROM =
                (Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue() || '');

        me.beanDelete.IN_FECHA_TO =
                (Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() || '');

        me.beanDelete.IN_MASSIVE = 'Y';

        me.beanDelete.IN_USUP = firstRecord.get('USUP');
        me.beanDelete.IN_FEUP = firstRecord.get('FEUP');
        me.beanDelete.IN_HOUP = firstRecord.get('HOUP');
        me.beanDelete.IN_PGMUP = firstRecord.get('PGMUP');

        me.searchParamsDelete = {
            beanString: JSON.stringify(me.beanDelete),
            beanSettlements: JSON.stringify(me.lstSettlement)
        };
        console.log(me.searchParamsDelete, 'searchParamsConciliation');
        me.sendDeleteSettlementsReverse(me.searchParamsDelete, function (responseData) {
            console.log(responseData)
        });
    },
    reverseSettlementsSelected: function () {
        me.beanDelete = {};

        if (!me.lstSettlement.length) {
            global.Msg({
                msg: 'No ha seleccionado ningun registro.'
            });
        }

        me.beanDelete.IN_FECHA_FROM =
                (Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue() || '');

        me.beanDelete.IN_FECHA_TO =
                (Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() || '') +
                (Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() || '');

        me.beanDelete.IN_MASSIVE = 'N';

        me.searchParamsDelete = {
            beanString: JSON.stringify(me.beanDelete),
            beanSettlements: JSON.stringify(me.lstSettlement)
        };

        me.sendDeleteSettlementsReverse(me.searchParamsDelete, function (responseData) {
            console.log(responseData)
        });
        console.log(me.searchParamsDelete, 'searchParamsConciliation');
    },
    sendDeleteSettlementsReverse: function (params, callback) {
        Ext.Ajax.request({
            url: prototype.url + '/sendDeleteSettlementsReverse',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: params.beanString, beanSettlements: params.beanSettlements},
            beforerequest: Ext.getCmp(prototype.id + '-panelMain').mask('Loading...'),
            success: function (response, options) {

                Ext.getCmp(prototype.id + '-panelMain').unmask('Loading...');
                let res = Ext.JSON.decode(response.responseText);
                console.log(res, 'res')

                if (res.success) {
                    global.Msg({msg: res.result});
                    me.btnSearch_click();

                } else {
                    global.Msg({msg: res.result});
                    callback(res);
                }
            },
            failure: function (response, options) {
                Ext.getCmp(prototype.id + '-panelMain').unmask('Loading...');
                console.error("Error en la petición AJAX");
                global.Msg({msg: "Error al obtener datos"});
            }
        });
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
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
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('01');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('01');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbProcessor').setValue('');
        Ext.getCmp(prototype.id + '-cmbStatus').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
        Ext.getCmp(prototype.id + '-txtCodeBank').setValue('');
        Ext.getCmp(prototype.id + '-txtSecuence').setValue('');
        Ext.getCmp(prototype.id + '-txtCardType').setValue('');
    },
    btnExcel_click: function (obj, e) {
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
    },
    exportExcel: function () {
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSXDuplicates?beanString=' + encodeURIComponent(searchParams.beanString));
                break;
            case  '-panelGridDataDeleteGroup':
                global.getFile(prototype.url + '/getXLSXRemovedGroup?beanString=' + encodeURIComponent(searchParams.beanString));
                break;
            case  '-panelGridDataDeleted':
                global.getFile(prototype.url + '/getXLSXDuplicatesRemoved?beanString=' + encodeURIComponent(me.paramsDetail.beanString));
                break;
        }

    },
    addFileDeleteJustification: function (column, e, row, colIndex, x, rowData) {
        let me = this;
        let record = rowData.data;

        let win = Ext.create('Ext.window.Window', {
            title: 'Upload Justification Image',
            modal: true,
            width: 420,
            layout: 'fit',
            items: [{
                    xtype: 'form',
                    padding: 10,
                    fileUpload: true,
                    defaults: {anchor: '100%'},
                    items: [{
                            xtype: 'filefield',
                            name: 'file',
                            fieldLabel: 'Image',
                            labelWidth: 60,
                            allowBlank: false,
                            buttonText: 'Browse...',
                            accept: 'image/*'
                        }],
                    buttons: [{
                            text: 'Upload',
                            handler: function (btn) {
                                let form = btn.up('form').getForm();
                                if (!form.isValid())
                                    return;

                                form.submit({
                                    url: prototype.url + '/addFileJustification',
                                    params: {
                                        USUP: record.USUP,
                                        FEUP: record.FEUP,
                                        HOUP: record.HOUP
                                    },
                                    waitMsg: 'Uploading file...',
                                    success: function (form, action) {
                                        Ext.Msg.alert(
                                                'Upload completed',
                                                action.result.message || 'File uploaded successfully'
                                                );
                                        win.close();
                                    },
                                    failure: function (f, action) {
                                        Ext.Msg.alert(
                                                'Upload failed',
                                                action.result?.message ||
                                                action.response?.responseText ||
                                                'Upload failed'
                                                );
                                    }

                                });
                            }
                        }, {
                            text: 'Cancel',
                            handler: function () {
                                win.close();
                            }
                        }]
                }]
        });

        win.show();
    },
    onViewIMG: function (column, e, row, colIndex, x, rowData) {

        const data = rowData.data;

        Ext.Ajax.request({
            url: prototype.url + '/getImages',
            method: 'GET',
            params: {
                USUP: data.USUP,
                FEUP: data.FEUP,
                HOUP: data.HOUP
            },
            success: function (resp) {
                let files;

                try {
                    files = Ext.decode(resp.responseText);
                } catch (e) {
                    Ext.Msg.alert('Error', 'Respuesta inválida del servidor');
                    return;
                }

                if (!Ext.isArray(files) || files.length === 0) {
                    Ext.Msg.alert('Info', 'No hay imágenes asociadas.');
                    return;
                }

                let index = 0;

                Ext.create('Ext.window.Window', {
                    title: 'Justification Images',
                    modal: true,
                    width: 1000,
                    height: 700,
                    layout: 'border',

                    items: [{
                            region: 'center',
                            xtype: 'panel',
                            bodyStyle: 'background:#000;',
                            layout: 'fit',
                            items: [{
                                    xtype: 'image',
                                    itemId: 'imgViewer',
                                    src: prototype.url + '/getImage'
                                            + '?folder=' + data.USUP + '-' + data.FEUP + '-' + data.HOUP
                                            + '&filename=' + files[0],
                                    style: {
                                        display: 'block',
                                        margin: 'auto',
                                        maxWidth: '100%',
                                        maxHeight: '100%'
                                    }
                                }]
                        }],

                    bbar: [
                        {
                            text: '◀ Previous',
                            handler: function (btn) {
                                if (index > 0) {
                                    index--;
                                    btn.up('window')
                                            .down('#imgViewer')
                                            .setSrc(
                                                    prototype.url + '/getImage'
                                                    + '?folder=' + data.USUP + '-' + data.FEUP + '-' + data.HOUP
                                                    + '&filename=' + files[index]
                                                    );
                                }
                            }
                        },
                        '->',
                        {
                            xtype: 'tbtext',
                            itemId: 'counter',
                            text: `1 / ${files.length}`
                        },
                        '->',
                        {
                            text: 'Next ▶',
                            handler: function (btn) {
                                if (index < files.length - 1) {
                                    index++;
                                    btn.up('window')
                                            .down('#imgViewer')
                                            .setSrc(
                                                    prototype.url + '/getImage'
                                                    + '?folder=' + data.USUP + '-' + data.FEUP + '-' + data.HOUP
                                                    + '&filename=' + files[index]
                                                    );
                                }
                            }
                        }
                    ],

                    listeners: {
                        afterrender: function (win) {
                            win.down('#counter').setText(`1 / ${files.length}`);
                        }
                    }
                }).show();

            },
            failure: function (resp) {
                Ext.Msg.alert('Error', resp.responseText || 'Error consultando imágenes');
            }
        });

    },

    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            obj.setValue('0' + month);
        } else {
            obj.setValue((month));
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridDataDeleteGroup':
                me.pagginActual = '-paggin2';
                break;
            case  '-panelGridDataDeleted':
                me.pagginActual = '-paggin3';
                break;
        }
    },
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
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
    },
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    getStoreYearBank: function (ALL) {
        var startYear = 2024;
        var fecha = new Date();
        var endYear = fecha.getFullYear() + 2;
        var years = [];
        if (ALL)
            years.push(['', 'All']);
        for (var year = endYear; year >= startYear; year--) {
            years.push([year, year]);
        }
        return Ext.create('Ext.data.ArrayStore', {
            storeId: 'year',
            autoLoad: true,
            data: years,
            fields: ['code', 'name']
        });
    },
    selectComboFromMonth: function (obj) {
        console.log(obj, 'obj from month')
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
        if (obj.getValue() != '') {
            Ext.getCmp(prototype.id + '-cmbDateFromDay').setDisabled(false);
        }
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        console.log(storeComboDataYear, 'comboToYear')
        console.log(comboToYear, 'comboToYear')
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromDay: function (obj) {
        console.log(obj, 'obj day from')
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
}
);