/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.BalanceAnalysis.BalanceAnalysisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BalanceAnalysisController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    lstData: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    dataObtain: {},
    init: function(view) {
        me = this;
        prototype.id = 'BalanceAnalysisForm';
        prototype.url = CONTEXTPATH + '/BalanceAnalysis';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.obtainData();
        this.control({
//            //   -------------------Eventos Genericos --------------------
//            '#BalanceAnalysisForm-xpanel': {
//                afterrender: this.xpanel_afterrender            
//            },
            '#BalanceAnalysisForm-btnSearch': {
                click: this.btnSearch_click
            },
//            '#BalanceAnalysisForm-btnClear': {
//                click: this.btnClear_click
//            },
//            '#BalanceAnalysisForm-btnExcel': {
//                click: this.btnExcel_click
//            },
            '#BalanceAnalysisForm-btnFilter': {
                click: this.btnFilter_click
            },
//            '#BalanceAnalysisForm-btnAdd': {
//                click: this.btnAdd_click
//            },
            '#BalanceAnalysisForm-btnBack': {
                click: this.btnBack_click
            },
            '#BalanceAnalysisForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#BalanceAnalysisForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#BalanceAnalysisForm-btn-pag-next': {
                click: this.pagNext
            },
            '#BalanceAnalysisForm-btn-pag-last': {
                click: this.pagLast
            }
//            //-----------------Eventos Especificos -------------------    
//
//
        });
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
//    onChangeCmbType: function(obj, value) {
//
//        Ext.getCmp(prototype.id + '-panelFilter1').hide();
//        Ext.getCmp(prototype.id + '-panelFilter2').hide();
//        Ext.getCmp(prototype.id + '-panelFilter3').hide();
//        Ext.getCmp(prototype.id + '-panelFilter4').hide();
//        Ext.getCmp(prototype.id + '-panelFilter5').hide();
//        Ext.getCmp(prototype.id + '-panelFilter6').hide();
//        Ext.getCmp(prototype.id + '-panelFilter7').hide();
//        Ext.getCmp(prototype.id + '-panelFilter8').hide();
//
//        if (value !== '') {
//            Ext.getCmp(prototype.id + '-panelFilter' + value).show();
//        }
//
//    },

    obtainData: function() {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');



        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');


        var cmbFTE = Ext.getCmp(prototype.id + '-cmbFTE');
        cmbFTE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["B", "BSP"],
                ["A", "ARC"],
                ["S", "ASR"],
                ["T", "TCN"]

            ]
        }));
        cmbFTE.setValue("");


        this.dataObtain.COUNTRY = 2;
        this.dataObtain.CARD = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    me.lstCountry = res.lstCountry;
                    Ext.getCmp(prototype.id + '-cmbCountry').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCountry, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

                    Ext.getCmp(prototype.id + '-cmbCARDC').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-cmbCARDC').setValue('');
                    me.btnSearch_click();

                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },
    setFormatParameter: function(strSQL) {

        me.bean = {};

        var selectedValue = Ext.getCmp(prototype.id + '-rbgType').getValue().rb;
        switch (selectedValue) {
            case 'rbSALES':
                me.bean.IN_TDOC = 'S';
                break;
            case 'rbREFUND':
                me.bean.IN_TDOC = 'R';
                break;
        }

        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();


        me.bean.IN_FTE = Ext.getCmp(prototype.id + '-cmbFTE').getValue();
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_TICKET = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        me.bean.IN_CARDN = Ext.getCmp(prototype.id + '-txtCARD').getValue();
        me.bean.IN_CARDC = Ext.getCmp(prototype.id + '-cmbCARDC').getValue();
        me.bean.IN_FECHA = Ext.getCmp(prototype.id + '-cmbFECHA').getValue();
        me.bean.strSQL = strSQL;

        //var check = Ext.getCmp(prototype.id + '-chkOAL').getValue();


        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
        console.log(searchParams);
    },
    btnSearch_click: function(obj, e) {
        //this.setFormatParameter();

        var chkDetail = Ext.getCmp(prototype.id + '-chkDetail').getValue();

        if (chkDetail) {
            this.imgSearch_clickHandler();
        } else {
            this.imgSearchTOTAL_clickHandler();
        }

//        this.setGridData();
    },
    imgSearch_clickHandler: function(obj, e) {
        this.setFormatParameter();

        if (rbPAY) {


            Ext.getCmp(prototype.id + '-colPrin').setText('Payments');
            Ext.getCmp(prototype.id + '-colPRINcurr').setText('Payments');



            imgSearchFiltro_clickHandler(bean);
            Reiniciar_Pag(bean);
            if (rbCURR.selected) {
                roBalance.search_1(bean);
            } else if (rbCOUN.selected) {
                roBalance.search_2(bean);
            } else if (rbTARJ.selected) {
                roBalance.search_3(bean);
            }
            //roBalance.search(bean);

        } else if (rbACCB) {

            colPrin.headerText = 'Payments';
            colPRINcurr.headerText = 'Payments';
            imgSearchFiltro_clickHandler(beanACCB);
            Reiniciar_Pag(beanACCB);
            roBalance.search_ACCB(beanACCB);

        } else if (rbSETT) {
            imgSearchFiltro_clickHandler(beanSETT);
            Reiniciar_Pag(beanSETT);
            roBalance.search_SETT(beanSETT);

        }

    },
    imgSearchTOTAL_clickHandler: function(obj, e) {
        //this.setFormatParameter();
        //this.setGridData();
        this.rb_handler();
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    setGridData: function() {
        win.lblUser_toolTip("Estructura: A2290");
        me.panelActual = '-panelMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        //me.setWidthPie();
        //this.setFormatParameter();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchTOTAL_ACCB'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });

        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMain').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMain').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    setGridDataACCB_Country: function() {
        win.lblUser_toolTip("Estructura: A2290");
        me.panelActual = '-panelMainDataACCBCountry';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        //me.setWidthPie();
        //this.setFormatParameter();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchTOTAL_ACCB'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });

        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainACCBCountry').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMainACCBCountry').setStore(storeGridDatas);
    },
    setGridDataACCB_Card: function() {
        win.lblUser_toolTip("Estructura: A2290");
        me.panelActual = '-panelMainDataACCBCard';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        //me.setWidthPie();
        //this.setFormatParameter();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchTOTAL_ACCB'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });

        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainACCBCard').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMainACCBCard').setStore(storeGridDatas);
    },
    setGridDataSett_Curr: function() {
        win.lblUser_toolTip("Estructura: A2290");
        me.panelActual = '-panelMainDataSettCurr';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        //me.setWidthPie();
        //this.setFormatParameter();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchTOTAL_SETT'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });

        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainSettCurr').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMainSettCurr').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    setGridDataSett_Country: function() {
        win.lblUser_toolTip("Estructura: A2290");
        me.panelActual = '-panelMainDataSettCountry';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        //me.setWidthPie();
        //this.setFormatParameter();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchTOTAL_SETT'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });

        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainSettCountry').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMainSettCountry').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataSett_Card: function() {
        win.lblUser_toolTip("Estructura: A2290");
        me.panelActual = '-panelMainDataSettCard';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        //me.setWidthPie();
        //this.setFormatParameter();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchTOTAL_SETT'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });

        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainSettCard').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMainSettCard').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataPay_Curr: function() {
        win.lblUser_toolTip("Estructura: A2290");
        me.panelActual = '-panelMainDataPayCurr';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        //me.setWidthPie();
        //this.setFormatParameter();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchTOTAL'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });

        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainPayCurr').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMainPayCurr').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataPay_Country: function() {
        win.lblUser_toolTip("Estructura: A2290");
        me.panelActual = '-panelMainDataPayCountry';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        //me.setWidthPie();
        //this.setFormatParameter();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchTOTAL'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });

        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainPayCountry').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMainPayCountry').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataPay_Card: function() {
        win.lblUser_toolTip("Estructura: A2290");
        me.panelActual = '-panelMainDataPayCard';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        //me.setWidthPie();
        //this.setFormatParameter();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchTOTAL'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });

        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainPayCard').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMainPayCard').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    // </editor-fold>
    //Drilldowns
    OnGridACCBDetByDate: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.bean = {};
        var selectedValue = Ext.getCmp(prototype.id + '-rbgType').getValue().rb;

        switch (selectedValue) {
            case 'rbSALES':
                me.bean.IN_TDOC = 'S';
                break;
            case 'rbREFUND':
                me.bean.IN_TDOC = 'R';
                break;
        }

        me.bean.IN_FTE = Ext.getCmp(prototype.id + '-cmbFTE').getValue();
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_CARDC = Ext.getCmp(prototype.id + '-cmbCARDC').getValue();
        me.bean.IN_FECHA = Ext.getCmp(prototype.id + '-cmbFECHA').getValue();
        me.bean.strDayFrom = rowData.data.strDayFrom;

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelACCBDetByDate';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.setGridACCBDetByDate();
    },
    setGridACCBDetByDate: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchTOTAL_ACCB_Det_COUNTRY'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });

        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataACCBDetByDate').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataACCBDetByDate').setStore(storeGridDatas);
    },
    OnGridACCBDetByCountry: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.bean = {};
        var selectedValue = Ext.getCmp(prototype.id + '-rbgType').getValue().rb;
        switch (selectedValue) {
            case 'rbSALES':
                me.bean.IN_TDOC = 'S';
                break;
            case 'rbREFUND':
                me.bean.IN_TDOC = 'R';
                break;
        }
        me.bean.strDayFrom = rowData.data.strDayFrom;
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        me.bean.IN_CARDC = Ext.getCmp(prototype.id + '-cmbCARDC').getValue();
        me.bean.IN_PAYMENT = rowData.data.SCURRENCY;
        me.bean.IN_FTE = Ext.getCmp(prototype.id + '-cmbFTE').getValue();
        me.bean.IN_COUNTRY = rowData.data.IN_COUNTRY;
        me.bean.strSQL = rowData.data.strSQL;
        me.bean.IN_CARDN = Ext.getCmp(prototype.id + '-txtCARD').getValue();
        me.bean.IN_FECHA = Ext.getCmp(prototype.id + '-cmbFECHA').getValue();


        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelACCBDetByCountry';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.setGridACCBDetByCountry();
    },
    setGridACCBDetByCountry: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTOTALBankACCB'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });

        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataACCBDetByCountry').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataACCBDetByCountry').setStore(storeGridDatas);
    },
    OnGridACCBCountryDetByCountry: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.bean = {};
        var selectedValue = Ext.getCmp(prototype.id + '-rbgType').getValue().rb;
        switch (selectedValue) {
            case 'rbSALES':
                me.bean.IN_TDOC = 'S';
                break;
            case 'rbREFUND':
                me.bean.IN_TDOC = 'R';
                break;
        }
        me.bean.strDayFrom = rowData.data.strDayFrom;
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        me.bean.IN_CARDC = Ext.getCmp(prototype.id + '-cmbCARDC').getValue();
        me.bean.IN_PAYMENT = rowData.data.SCURRENCY;
        me.bean.IN_FTE = Ext.getCmp(prototype.id + '-cmbFTE').getValue();
        me.bean.IN_COUNTRY = rowData.data.IN_COUNTRY;
        me.bean.strSQL = rowData.data.strSQL;
        me.bean.IN_CARDN = Ext.getCmp(prototype.id + '-txtCARD').getValue();
        me.bean.IN_FECHA = Ext.getCmp(prototype.id + '-cmbFECHA').getValue();


        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelACCBCountryDetByCountry';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.setGridACCBCountryDetByCountry();
    },
    setGridACCBCountryDetByCountry: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTOTALBankACCB'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });

        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataACCBCountryDetByCountry').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataACCBCountryDetByCountry').setStore(storeGridDatas);
    },
    OnGridACCBCardDetByCard: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.bean = {};
        var selectedValue = Ext.getCmp(prototype.id + '-rbgType').getValue().rb;
        switch (selectedValue) {
            case 'rbSALES':
                me.bean.IN_TDOC = 'S';
                break;
            case 'rbREFUND':
                me.bean.IN_TDOC = 'R';
                break;
        }
        me.bean.strDayFrom = rowData.data.strDayFrom;
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        me.bean.IN_CARDC = Ext.getCmp(prototype.id + '-cmbCARDC').getValue();
        me.bean.IN_PAYMENT = rowData.data.SCURRENCY;
        me.bean.IN_FTE = Ext.getCmp(prototype.id + '-cmbFTE').getValue();
        me.bean.IN_COUNTRY = rowData.data.IN_COUNTRY;
        me.bean.SCARCOD = rowData.data.SCARCOD;
        me.bean.strSQL = rowData.data.strSQL;
        me.bean.IN_CARDN = Ext.getCmp(prototype.id + '-txtCARD').getValue();
        me.bean.IN_FECHA = Ext.getCmp(prototype.id + '-cmbFECHA').getValue();


        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelACCBCardDetByCard';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.setGridACCBCardDetByCard();
    },
    setGridACCBCardDetByCard: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTOTALBankACCB'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataACCBCardDetByCard').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataACCBCardDetByCard').setStore(storeGridDatas);
    },
    OnGridPayCurrDetByDate: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.bean = {};
        var selectedValue = Ext.getCmp(prototype.id + '-rbgType').getValue().rb;
        switch (selectedValue) {
            case 'rbSALES':
                me.bean.IN_TDOC = 'S';
                break;
            case 'rbREFUND':
                me.bean.IN_TDOC = 'R';
                break;
        }
        me.bean.strDayFrom = rowData.data.strDayFrom;
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        me.bean.IN_CARDC = Ext.getCmp(prototype.id + '-cmbCARDC').getValue();
        me.bean.IN_PAYMENT = rowData.data.SCURRENCY;
        me.bean.IN_FTE = Ext.getCmp(prototype.id + '-cmbFTE').getValue();
        me.bean.IN_COUNTRY = rowData.data.IN_COUNTRY;
        me.bean.SCARCOD = rowData.data.SCARCOD;
        me.bean.strSQL = rowData.data.strSQL;
        me.bean.IN_CARDN = Ext.getCmp(prototype.id + '-txtCARD').getValue();
        me.bean.IN_FECHA = Ext.getCmp(prototype.id + '-cmbFECHA').getValue();


        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelPayCurrDetByDate';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.setGridPayCurrDetByDate();
    },
    setGridPayCurrDetByDate: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchTOTAL_ACCB_Det_COUNTRY'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataPayCurrDetByDate').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataPayCurrDetByDate').setStore(storeGridDatas);
    },
    OnGridPayDetByCountry: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.bean = {};
        var selectedValue = Ext.getCmp(prototype.id + '-rbgType').getValue().rb;
        switch (selectedValue) {
            case 'rbSALES':
                me.bean.IN_TDOC = 'S';
                break;
            case 'rbREFUND':
                me.bean.IN_TDOC = 'R';
                break;
        }
        me.bean.strDayFrom = rowData.data.strDayFrom;
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        me.bean.IN_CARDC = Ext.getCmp(prototype.id + '-cmbCARDC').getValue();
        me.bean.IN_PAYMENT = rowData.data.SCURRENCY;
        me.bean.IN_FTE = Ext.getCmp(prototype.id + '-cmbFTE').getValue();
        me.bean.IN_COUNTRY = rowData.data.IN_COUNTRY;
        me.bean.SCARCOD = rowData.data.SCARCOD;
        me.bean.strSQL = rowData.data.strSQL;
        me.bean.IN_CARDN = Ext.getCmp(prototype.id + '-txtCARD').getValue();
        me.bean.IN_FECHA = Ext.getCmp(prototype.id + '-cmbFECHA').getValue();


        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelPayDetByCountry';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.setGridPayDetByCountry();
    },
    setGridPayDetByCountry: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTOTALBankACCB'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataPayDetByCountry').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataPayDetByCountry').setStore(storeGridDatas);
    },
    setGridACCBDetail_Curr: function() {
        win.lblUser_toolTip("Estructura: A2290");
        me.panelActual = '-panelDetailACCB_Curr';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search_ACCB'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

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
                    }
                }
            }
        });
        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDetailACCB_Curr').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetailACCB_Curr').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridACCBDetail_Country: function() {
        win.lblUser_toolTip("Estructura: A2290");
        me.panelActual = '-panelDetailACCB_Country';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search_ACCB'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin1');
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
                    }
                }
            }
        });
        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDetailACCB_Country').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetailACCB_Country').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin1').bindStore(storeGridDatas);
    },
    setGridACCBDetail_Card: function() {
        win.lblUser_toolTip("Estructura: A2290");
        me.panelActual = '-panelDetailACCB_Card';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search_ACCB'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {

                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
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
                        var data = obj.data.items[0].data;
                    }
                }
            }
        });
        console.log(storeGridDatas);
        global.clear();
        Ext.getCmp(prototype.id + '-gridDetailACCB_Card').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetailACCB_Card').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    rbgSELEC_ChangeType: function() {
        this.rb_handler();
    },
    rbgPRINC_ChangeType: function() {
        this.rb_handler();
    },
    rb_handler: function() {
        console.log("Detectando cambios en radiobuttons");
        var selectedValue_Search = Ext.getCmp(prototype.id + '-rbgPRINC').getValue().rbgSearch;
        var selectedValue_Group = Ext.getCmp(prototype.id + '-rbgSELEC').getValue().rbgGroup;
        var chkDetail = Ext.getCmp(prototype.id + '-chkDetail').getValue()

        //ACCB
        if (selectedValue_Search === 'rbACCB') {
            switch (selectedValue_Group) {
                case 'rbCURR':
                    console.log(selectedValue_Search);
                    console.log(selectedValue_Group);
                    this.setFormatParameter('CURR');
                    if (chkDetail) {
                        this.setGridACCBDetail_Curr();
                    } else {
                        this.setGridData();
                    }

                    break;
                case 'rbCOUN':
                    console.log(selectedValue_Search);
                    console.log(selectedValue_Group);
                    this.setFormatParameter('COUN');
                    if (chkDetail) {
                        this.setGridACCBDetail_Country();
                    } else {                        
                        this.setGridDataACCB_Country();
                    }

                    break;
                case 'rbTARJ':
                    console.log(selectedValue_Search);
                    console.log(selectedValue_Group);
                    this.setFormatParameter('TARJ');
                    if (chkDetail) {
                        this.setGridACCBDetail_Card();
                    } else {                        
                        this.setGridDataACCB_Card();
                    }

                    break;
            }
        }
        //Settlement
        if (selectedValue_Search === 'rbSETT') {
            switch (selectedValue_Group) {
                case 'rbCURR':
                    console.log(selectedValue_Search);
                    console.log(selectedValue_Group);
                    if (chkDetail) {

                    } else {
                        this.setFormatParameter('CURR');
                        this.setGridDataSett_Curr();
                    }

                    break;
                case 'rbCOUN':
                    console.log(selectedValue_Search);
                    console.log(selectedValue_Group);
                    if (chkDetail) {

                    } else {
                        this.setFormatParameter('COUN');
                        this.setGridDataSett_Country();
                    }

                    break;
                case 'rbTARJ':
                    console.log(selectedValue_Search);
                    console.log(selectedValue_Group);
                    if (chkDetail) {

                    } else {
                        this.setFormatParameter('TARJ');
                        this.setGridDataSett_Card();
                    }

                    break;
            }
        }
        //Payments
        if (selectedValue_Search === 'rbPAY') {
            switch (selectedValue_Group) {
                case 'rbCURR':
                    console.log(selectedValue_Search);
                    console.log(selectedValue_Group);
                    if (chkDetail) {

                    } else {
                        this.setFormatParameter('CURR');
                        this.setGridDataPay_Curr();
                    }

                    break;
                case 'rbCOUN':
                    console.log(selectedValue_Search);
                    console.log(selectedValue_Group);
                    if (chkDetail) {

                    } else {
                        this.setFormatParameter('COUN');
                        this.setGridDataPay_Country();
                    }

                    break;
                case 'rbTARJ':
                    console.log(selectedValue_Search);
                    console.log(selectedValue_Group);
                    if (chkDetail) {

                    } else {
                        this.setFormatParameter('TARJ');
                        this.setGridDataPay_Card();
                    }

                    break;
            }
        }
        //Source
        if (selectedValue_Search === 'rbSRC') {
            switch (selectedValue_Group) {
                case 'rbCURR':
                    console.log(selectedValue_Search);
                    console.log(selectedValue_Group);
                    break;
                case 'rbCOUN':
                    console.log(selectedValue_Search);
                    console.log(selectedValue_Group);
                    break;
                case 'rbTARJ':
                    console.log(selectedValue_Search);
                    console.log(selectedValue_Group);
                    break;
            }
        }
    },
    chkDetail_ChangeValue: function() {
        console.log("check_detail");
        console.log(Ext.getCmp(prototype.id + '-chkDetail').getValue());
        this.rb_handler();
    },
    validateFields: function() {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.BalanceAnalysisForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
            }
        }).show();
    },
    btnBack_click: function(obj, e) {

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
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbCARDC').setValue('');
        Ext.getCmp(prototype.id + '-cmbCurrency').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

    },
    btnExcel_click: function(obj, e) {

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
                fn: function(btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function() {

        this.setFormatParameter();
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-panelMainData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    onDownloadFile: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var resultByte = res.bytes;
                var bytes = new Uint8Array(resultByte); // pass your byte response to this constructor
                var blob = new Blob([bytes], {type: "application/png"});// change resultByte to bytes

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = me.fileName;
                link.click();
            }
        });

    },
    btnFilter_click: function(obj) {
        console.log('btnFilter_click');
        var option = Ext.getCmp(prototype.id + '-boxSearchFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function() {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        console.log(me.panelActual)
        console.log(ancho)
        switch (me.panelActual) {
            case  '-panelMainData':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break
            case  '-panelMainDataACCBCountry':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break
            case  '-panelMainDataACCBCard':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break
            case  '-panelMainDataSettCurr':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break
            case  '-panelMainDataSettCountry':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break
            case  '-panelMainDataSettCard':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break
            case  '-panelMainDataPayCurr':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break
            case  '-panelMainDataPayCountry':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break
            case  '-panelMainDataPayCard':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break
            case  '-panelACCBDetByDate':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break
            case  '-panelACCBDetByCountry':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break
            case  '-panelACCBCountryDetByCountry':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break
            case  '-panelACCBCardDetByCard':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break
            case  '-panelPayCurrDetByDate':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break
            case  '-panelPayDetByCountry':
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                break
            default:
                Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                break;
        }
        
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelDetailACCB_Curr':
                me.pagginActual = '-paggin';
                break;
            case  '-panelDetailACCB_Country':
                me.pagginActual = '-paggin1';
                break;
            case  '-panelDetailACCB_Card':
                me.pagginActual = '-paggin2';
                break;
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }


}
);
