/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.interline.AccountingPasseInvoices.AccountingPasseInvoicesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingPasseInvoicesController',
    fecha: new Date(),
    childs: '',
    bean: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    me: '', //
    searchParams: {},
    paramsDetail: {},
    paramsExcel: {},
    beanExcel: {},
    bean20: {},
    init: function (view) {
        me = this;//
        prototype.id = 'AccountingPasseInvoicesForm'; //
        prototype.url = CONTEXTPATH + '/AccountingPasseInvoices';//
        prototype.urlMaster = CONTEXTPATH + '/MasterController';//
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
            // -------------------Eventos Genericos --------------------
            '#AccountingPasseInvoicesForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#AccountingPasseInvoicesForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AccountingPasseInvoicesForm-btnClear': {
//                click: this.btnClear_click
            },
            '#AccountingPasseInvoicesForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AccountingPasseInvoicesForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#AccountingPasseInvoicesForm-btnBack': {
                click: this.btnBack_click
            },
            '#AccountingPasseInvoicesForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AccountingPasseInvoicesForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AccountingPasseInvoicesForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AccountingPasseInvoicesForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#AccountingPasseInvoicesForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#AccountingPasseInvoicesForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#AccountingPasseInvoicesForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#AccountingPasseInvoicesForm-chckBtn': {
                change: this.onChckBtn
            }
        });
    },
    xpanel_afterrender: function (obj, e) {        
        this.setStoreData();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onChckBtn: function (obj, value) {
        if (value) {
            Ext.getCmp(prototype.id + '-cmbSource').show();
        } else {
            Ext.getCmp(prototype.id + '-cmbSource').hide();
        }
        this.btnSearch_click();
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
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
    setStoreData: function () {
        
        var month = this.fecha.getMonth();

        if (month < 10) {
            month = '0' + month;
        }
        
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(false));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(false));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);
        
        var cmbTfecha = Ext.getCmp(prototype.id + '-cmbTfecha');
        cmbTfecha.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["AD", "Accounting Date"],
                ["PD", "Provision Date"]
            ]
        }));
        cmbTfecha.setValue("PD");

        var cmbTTRAN = Ext.getCmp(prototype.id + '-cmbTTRAN');
        cmbTTRAN.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["OB", "IXC"],
                ["IB", "IXP"]
            ]
        }));
        cmbTTRAN.setValue("OB");
        
        var cmbPEREST = Ext.getCmp(prototype.id + '-cmbPEREST');
        cmbPEREST.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["03", "03"],
                ["04", "04"]
            ]
        }));
        cmbPEREST.setValue("03");

        this.btnSearch_click();

    },
    showSummary: function (obj, value, old_value) {
        
        if (value) {
            Ext.getCmp(prototype.id + '-panelGrid').hide();
            Ext.getCmp(prototype.id + '-panelGridSummary').show();
            this.setFormatParameter();
            this.setGridSummary();
        } else {
            Ext.getCmp(prototype.id + '-panelGridSummary').hide();
            Ext.getCmp(prototype.id + '-panelGrid').show();
            this.btnSearch_click();
        }
                       
    },
    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        this.setGrid();
        
        var TTRAN = Ext.getCmp(prototype.id + '-cmbTTRAN').getValue();
        if(TTRAN === 'OB'){
            Ext.getCmp(prototype.id + '-panelContaIXP').hide();
            Ext.getCmp(prototype.id + '-panelContaIXC').show();
            this.setGridContaIXC();
        }else{
            Ext.getCmp(prototype.id + '-panelContaIXC').hide();
            Ext.getCmp(prototype.id + '-panelContaIXP').show();
            this.setGridContaIXP();
        }
//        this.setGridData();

    },
    setFormatParameter: function () {

        me.bean = {};
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
//        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
//        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

//        monthFrom = monthFrom < 10 && monthFrom != "" ? "0" + monthFrom : monthFrom;
//        monthTo = monthTo < 10 && monthTo != "" ? "0" + monthTo : monthTo;
//        dayFrom = dayFrom < 10 && dayFrom != "" ? "0" + dayFrom : dayFrom;
//        dayTo = dayTo < 10 && dayTo != "" ? "0" + dayTo : dayTo;
        me.bean.IN_FECHA_FROM = '' + yearFrom + monthFrom;
        me.bean.IN_FECHA_TO = '' + yearTo + monthTo;

        me.bean.IN_TFECHA = Ext.getCmp(prototype.id + '-cmbTfecha').getValue();
        me.bean.IN_TTRAN = Ext.getCmp(prototype.id + '-cmbTTRAN').getValue();
        me.bean.IN_PEREST = Ext.getCmp(prototype.id + '-cmbPEREST').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString
        };
        console.log(searchParams);
    },
    // <editor-fold defaultstate="collapsed" desc="setGrid">

    setGrid: function () {
        win.lblUser_toolTip("Estructura: SFI100/A1964/A1965");
        me.setWidthPie();
        me.panelActual = '-panelGridData';
        me.drillDown.push(me.panelActual);
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
//                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                },
                load: function (obj, obj2, success, response, obj5) {
//                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    
                    var typeDate = Ext.getCmp(prototype.id + '-cmbTfecha').getValue()
                    if (typeDate === "PD") {
                        Ext.getCmp(prototype.id + '-typeDate').setText("Provision");
                    } else {
                        Ext.getCmp(prototype.id + '-typeDate').setText("Accounting");
                    }
                    
                    if (res.success) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                        }
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    setGridContaIXC: function () {
        me.setWidthPie();
        me.panelActual = '-panelGridData';
        me.drillDown.push(me.panelActual);
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchA1964'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
//                    Ext.getCmp(prototype.id + '-panelContaIXC').mask('Loading...');
                },
                load: function (obj, obj2, success, response, obj5) {
//                    Ext.getCmp(prototype.id + '-panelContaIXC').unmask();
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    
                    if (res.success) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            
                        }
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridContaIXC').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridContaIXC').setStore(storeGridDatas);

    },
    setGridContaIXP: function () {
        me.setWidthPie();
        me.panelActual = '-panelGridData';
        me.drillDown.push(me.panelActual);
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchA1965'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                    Ext.getCmp(prototype.id + '-panelContaIXC').mask('Loading...');
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-panelContaIXC').unmask();
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    
                    if (res.success) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            
                        }
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridContaIXP').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridContaIXP').setStore(storeGridDatas);

    },
    setGridSummary: function () {
        win.lblUser_toolTip("Estructura: SFI100");
        
//        me.panelActual = '-panelGridSummary';
//        me.drillDown.push(me.panelActual);
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchBySummary'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
//                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                },
                load: function (obj, obj2, success, response, obj5) {
//                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    
                    if (res.success) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            
                        }
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataSummary').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataSummary').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    // </editor-fold>
     
     
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    setGridData: function () {
//        win.lblUser_toolTip("Estructura: A1964/A1965");
        me.setWidthPie();
        me.panelActual = '-panelGridData';
        me.drillDown.push(me.panelActual);
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchX'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                    Ext.getCmp(prototype.id + '-panelGrid2').mask('Loading...');
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-panelGrid2').unmask();
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    
                    if (res.success) {
                        if (obj.data.length === 0) {
                            Ext.getCmp(prototype.id + '-idActive').setText('0.00');
                            Ext.getCmp(prototype.id + '-idPassive').setText('0.00');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = res.data[0];
                            var dataXpagar = res.lstXpagar[0];
                            var lstData = res.data;
                            var lstXpagar = res.lstXpagar;
                            console.log(lstData);
                            console.log(lstXpagar);

                            // ---------------------------------------------------------------------

                            var a = [];
                            var dataRoot = {text: '.', expanded: false, children: []};

                            Ext.Object.each(lstData, function (index, value) {
                                if (a.indexOf(value.A1964FCONT) < 0) {
                                    var x = [];
                                    
                                    var totQTY_ACTIV = 0;
                                    var totQTY_PASIV = 0;
                                    Ext.Object.each(lstData, function (index, valuex) {
                                        if (value.A1964FCONT === valuex.A1964FCONT) {
                                            totQTY_ACTIV += valuex.QTY_ACTIV;
                                            totQTY_PASIV += valuex.QTY_PASIV;
                                        }
                                    });

                                    a.push(value.A1964FCONT);
                                    dataRoot.children.push({
                                        A1964FCONT: value.A1964FCONT,
                                        A1964TUSO: '',
                                        A1964CUR: value.A1964CUR,
                                        QTY_ACTIV: totQTY_ACTIV,
                                        QTY_PASIV: totQTY_PASIV,
                                        expanded: false, children: []
                                    });
                                    var b = [];
                                    Ext.Object.each(lstData, function (index, value01) {
                                        if (value.A1964FCONT === value01.A1964FCONT) {
    //                                    b.push(value01.VNR);
                                            dataRoot.children[a.indexOf(value.A1964FCONT)].children.push({
                                                A1964FCONT: value01.A1964FCONT,
                                                A1964TUSO: value01.A1964TUSO,
                                                DES_SOURCOD: value01.DES_SOURCOD,
                                                A1964CUR: value01.A1964CUR,
                                                QTY_ACTIV: value01.QTY_ACTIV,
                                                QTY_PASIV: value01.QTY_PASIV,
                                                leaf: true
                                            });
                                        }
                                    });
                                }
                            });
//                            console.log(dataRoot);
                            
                            Ext.getCmp(prototype.id + '-idActive').setText(Ext.util.Format.number(data.tot_QTY_ACTIV, '0,000.00'));
                            Ext.getCmp(prototype.id + '-idPassive').setText(Ext.util.Format.number(data.tot_QTY_PASIV, '0,000.00'));

                            
                            var storeTree = Ext.create('Ext.data.TreeStore', {
                                root: dataRoot
                            });

                            Ext.getCmp(prototype.id + '-gridDataX').setStore(storeTree);

                            // ---------------------------------------------------------------------
                            
                            var axPagar = [];
                            var dataRootxPagar = {text: '.', expanded: false, children: []};
                            
                            Ext.Object.each(lstXpagar, function (index, value) {
                                if (axPagar.indexOf(value.A1965FCONT) < 0) {
                                    var x = [];
                                    
                                    var totQTY_ACTIV_xPagar = 0;
                                    var totQTY_PASIV_xPagar= 0;
                                    Ext.Object.each(lstXpagar, function (index, valuex) {
                                        if (value.A1965FCONT === valuex.A1965FCONT) {
                                            totQTY_ACTIV_xPagar += valuex.QTY_ACTIV;
                                            totQTY_PASIV_xPagar += valuex.QTY_PASIV;
                                        }
                                    });

                                    axPagar.push(value.A1965FCONT);
                                    dataRootxPagar.children.push({
                                        A1965FCONT: value.A1965FCONT,
                                        A1965TUSO: '',
                                        A1965CUR: value.A1965CUR,
                                        QTY_ACTIV: totQTY_ACTIV_xPagar,
                                        QTY_PASIV: totQTY_PASIV_xPagar,
                                        expanded: false, children: []
                                    });
                                    var b = [];
                                    Ext.Object.each(lstXpagar, function (index, value01) {
                                        if (value.A1965FCONT === value01.A1965FCONT) {
    //                                    b.push(value01.VNR);
                                            dataRootxPagar.children[axPagar.indexOf(value.A1965FCONT)].children.push({
                                                
                                                A1965FCONT: value01.A1965FCONT,
                                                A1965TUSO: value01.A1965TUSO,
                                                DES_SOURCOD: value01.DES_SOURCOD,
                                                A1965CUR: value01.A1965CUR,
                                                QTY_ACTIV: value01.QTY_ACTIV,
                                                QTY_PASIV: value01.QTY_PASIV,
                                                leaf: true
                                            });
                                        }
                                    });
                                }
                            });
                            
                            Ext.getCmp(prototype.id + '-idActivexPagar').setText(Ext.util.Format.number(dataXpagar.tot_QTY_ACTIV, '0,000.00'));
                            Ext.getCmp(prototype.id + '-idPassivexPagar').setText(Ext.util.Format.number(dataXpagar.tot_QTY_PASIV, '0,000.00'));

                            
                            var storeTreeXpagar = Ext.create('Ext.data.TreeStore', {
                                root: dataRootxPagar
                            });

                            Ext.getCmp(prototype.id + '-gridDataxPagar').setStore(storeTreeXpagar);

                        }
                    }
                }
            }
        });
        global.clear();
//        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="setGridDataBySource">
    setGridDataBySource: function () {
        win.lblUser_toolTip("Estructura: SFI030");
        me.panelActual = '-panelGridData2';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/searchSource'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin2');
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
            Ext.getCmp(prototype.id + '-gridData2').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>

    searchTKT: function () {
        this.bean20.IN_TKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        me.panelActual = '-boxTKT';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchTKT'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.bean20)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: SFI020");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
//                            me.selectedChild('boxTKT');
                            var bean = obj.data.items[0].data;
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridBoxTKT').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id+'-paggin13').bindStore(storeGridDatas);
    },
    setGridDataDetailSFI30: function (data) {
        win.lblUser_toolTip("Estructura: SFI030");
        me.setWidthPie();
        console.log(me.paramsDetail);
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail30'
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
                    } else {
                        var beanD = obj.data.items[0].data;
                        var title = 'Billing Date. : ' + beanD.strFormatDate + '   ' + ' Period : ' + beanD.PERNUM;
                        Ext.getCmp(prototype.id + '-labelTitle3').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailSFI30').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    onViewDataDetailSFI30: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMainDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetailSFI30();
    },
    setGridDataDetail20: function (data) {
        win.lblUser_toolTip("Estructura: SFI020");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail20'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin7');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var beanD = obj.data.items[0].data;
                        var title = 'Billing Date. : ' + beanD.strFormatDate + '   ' + ' Period : ' + beanD.PERNUM + '   ' + ' Airline Code : ' + beanD.BAIR;
                        Ext.getCmp(prototype.id + '-titleGridDataDetail20').setText(title);
                        // Ext.getCmp(prototype.id + '-labelTitle7').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail20').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);
    },
    onViewDataDetailSFI20: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMainDataDetail20';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetail20();
    },
    setGridDataDetaiSFI41: function (data) {
        win.lblUser_toolTip("Estructura: SFI041");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail41'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin15');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var title = 'Billing Date. : ' + bean.BDATE + '   ' + ' Period : ' + bean.PERNUM + '   ' + ' Ticket : ' + bean.TKT;
                        Ext.getCmp(prototype.id + '-titleGridDataDetailSFI41').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailSFI41').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin15').bindStore(storeGridDatas);
    },
    onViewDataDetailSFI41: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMainDataDetailSFI41';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetaiSFI41();
    },
    setGridDataDetail21: function (data) {
        win.lblUser_toolTip("Estructura: SFI021");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail21'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin8');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var beanD = obj.data.items[0].data;
                        var title = 'Billing Date. : ' + beanD.strFormatDate + '   ' + ' Period : ' + beanD.PERNUM + '   ' + ' Airline Code : ' + beanD.BAIR;
                        Ext.getCmp(prototype.id + '-titleGridDataDetail21').setText(title);
                        // Ext.getCmp(prototype.id + '-labelTitle7').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail21').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin8').bindStore(storeGridDatas);
    },
    onViewDataDetailSFI21: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMainDataDetail21';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetail21();
    },
    setGridDataDetail22: function (data) {
        win.lblUser_toolTip("Estructura: SFI022");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail22'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin9');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var beanD = obj.data.items[0].data;
                        var title = 'Billing Date. : ' + beanD.strFormatDate + '   ' + ' Period : ' + beanD.PERNUM + ' Source Code : ' + beanD.SOURCOD + '   ' + ' Airline Code : ' + beanD.BAIR;
                        Ext.getCmp(prototype.id + '-labelTitle8').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail22').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin8').bindStore(storeGridDatas);
    },
    onViewDataDetailSFI22: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMainDataDetail22';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetail22();
    },
    setGridDataDetail30ByCia: function (data) {
        win.lblUser_toolTip("Estructura: SFI030");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail30byCIA'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin9');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var beanD = obj.data.items[0].data;
                        var title = 'Billing Date. : ' + beanD.strFormatDate + '   ' + ' Period : ' + beanD.PERNUM;
                        Ext.getCmp(prototype.id + '-labelTitle9').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailByCIA').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin9').bindStore(storeGridDatas);
    },
    onViewDetailCIA: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMainDataDetailbyCIA';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetail30ByCia();
    },
    setGridDataDetail30BySOURCE: function (data) {
        win.lblUser_toolTip("Estructura: SFI030");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail30bySOURCE'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin10');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var beanD = obj.data.items[0].data;
                        var title = 'Billing Date. : ' + beanD.strFormatDate + '   ' + ' Period : ' + beanD.PERNUM;
                        Ext.getCmp(prototype.id + '-labelTitle10').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailBySOURCE').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin10').bindStore(storeGridDatas);
    },
    onViewDetailbySOURCE: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMainDataDetailbySOURCE';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetail30BySOURCE();
    },
    setGridDataDetail20bySO: function (data) {
        win.lblUser_toolTip("Estructura: SFI020");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail20bySO'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin11');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var title = 'Billing Date. : ' + bean.strFormatDate + '   ' + ' Period : ' + bean.PERNUM
                                + '   ' + ' Source Code : ' + bean.SOURCOD + '   ' + ' Airline Code : ' + bean.BAIR;
                        Ext.getCmp(prototype.id + '-titleGridDataDetail20BYSO').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail20bySO').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin11').bindStore(storeGridDatas);
    },
    setGridDataDetail21bySO: function (data) {
        win.lblUser_toolTip("Estructura: SFI021");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail21bySO'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin12');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var title = 'Billing Date. : ' + bean.strFormatDate + '   ' + ' Period : ' + bean.PERNUM
                                + '   ' + ' Source Code : ' + bean.SOURCOD + '   ' + ' Airline Code : ' + bean.BAIR;
                        Ext.getCmp(prototype.id + '-titleGridDataDetail21BYSO').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail21bySO').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin12').bindStore(storeGridDatas);
    },
    setGridDataDetail22bySO: function (data) {
        win.lblUser_toolTip("Estructura: SFI022");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail22bySO'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin13');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var title = 'Billing Date. : ' + bean.strFormatDate + '   ' + ' Period : ' + bean.PERNUM
                                + '   ' + ' Source Code : ' + bean.SOURCOD + '   ' + ' Airline Code : ' + bean.BAIR;
                        Ext.getCmp(prototype.id + '-labelTitle13').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail22bySO').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin13').bindStore(storeGridDatas);
    },
    onViewDetailbyCIASOURCE: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var option = rowData.data.SOURCOD;

        switch (option) {
            case '01':
            case '02':
            case '03':
            case '08':
            case '14':
            case '21':
            case '23':
            case '25':
            case '26':
            case '90':
                me.drillDown.push(me.panelActual);
                me.panelActual = '-panelMainDataDetail20bySO';
                global.selectedChild(me.childs, prototype.id + me.panelActual);
                me.paramsDetail.beanString = JSON.stringify(rowData.data);
                this.setGridDataDetail20bySO();
                break

            case '04':
            case '05':
            case '06':
            case '44':
            case '45':
            case '46':
            case '91':
                me.drillDown.push(me.panelActual);
                me.panelActual = '-panelMainDataDetail21bySO';
                global.selectedChild(me.childs, prototype.id + me.panelActual);
                me.paramsDetail.beanString = JSON.stringify(rowData.data);
                this.setGridDataDetail21bySO();
                break;
            case '09':
            case '24':
            case '92':
            case '93':
            case '94':
                me.drillDown.push(me.panelActual);
                me.panelActual = '-panelMainDataDetail22bySO';
                global.selectedChild(me.childs, prototype.id + me.panelActual);
                me.paramsDetail.beanString = JSON.stringify(rowData.data);
                this.setGridDataDetail22bySO();
                break;
            default:
                global.Msg({
                    msg: 'Data not found.'
                });

        }
        console.log(rowData.data);
    },
    setGridDataSource: function (bean) {



        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchSourceDetail'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin14');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                        var bean = obj.data.items[0].data;
//                        var title = 'Billing Date. : ' + bean.strFormatDate + '   ' + ' Period : ' + bean.PERNUM
//                                + '   ' + ' Source Code : ' + bean.SOURCOD + '   ' + ' Airline Code : ' + bean.BAIR;
//                        Ext.getCmp(prototype.id + '-labelTitle13').setText(title);
                    }
                }
            }
        });


        var option = bean.SOURCOD;

        switch (option) {
            case '01':
            case '02':
            case '03':
            case '08':
            case '14':
            case '21':
            case '23':
            case '25':
            case '26':
            case '90':
                me.panelActual = '-panelMainDataDetail20';
                win.lblUser_toolTip("Estructura: SFI020");
                global.selectedChild(me.childs, prototype.id + me.panelActual);
                me.setWidthPie();
                Ext.getCmp(prototype.id + '-gridDataDetail20').bindStore(storeGridDatas);
                break

            case '04':
            case '05':
            case '06':
            case '44':
            case '45':
            case '46':
            case '91':
                me.panelActual = '-panelMainDataDetail21';
                win.lblUser_toolTip("Estructura: SFI021");
                global.selectedChild(me.childs, prototype.id + me.panelActual);
                me.setWidthPie();
                Ext.getCmp(prototype.id + '-gridDataDetail21').bindStore(storeGridDatas);
                break;
            case '09':
            case '24':
            case '92':
            case '93':
            case '94':
                me.panelActual = '-panelMainDataDetail22';
                win.lblUser_toolTip("Estructura: SFI022");
                global.selectedChild(me.childs, prototype.id + me.panelActual);
                me.setWidthPie();
                Ext.getCmp(prototype.id + '-gridDataDetail22').bindStore(storeGridDatas);
                break;
            default:
                global.Msg({
                    msg: 'Data not found.'
                });

        }

        global.clear();
        Ext.getCmp(prototype.id + '-paggin14').bindStore(storeGridDatas);
    },
    onViewDataSource: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        // me.panelActual = '-panelMainDataDetailbySOURCE';
        //global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataSource(rowData.data);
    },
    setGridDataDetail20_1: function (data) {
        win.lblUser_toolTip("Estructura: SFI020");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail20_1'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
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
                        var beanD = obj.data.items[0].data;
                        var title = 'Billing Date. : ' + beanD.strFormatDate + '   ' + ' Period : ' + beanD.PERNUM + '   ' + ' Source Code : ' + beanD.SOURCOD;
                        ;
                        Ext.getCmp(prototype.id + '-labelTitle4').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail20_1').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
    },
    setGridDataDetail21_1: function (data) {
        win.lblUser_toolTip("Estructura: SFI021");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail211'
            }, listeners: {
                beforeload: function (obj) {
                    console.log('-----------------------------------');
                    console.log(me.paramsDetail);
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin5');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    console.log(obj);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var beanD = obj.data.items[0].data;
                        var title = 'Billing Date. : ' + beanD.strFormatDate + '   ' + ' Period : ' + beanD.PERNUM + '   ' + ' Source Code : ' + beanD.SOURCOD;
                        ;
                        Ext.getCmp(prototype.id + '-labelTitle5').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail21_1').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
    },
    setGridDataDetail22_1: function (data) {
        win.lblUser_toolTip("Estructura: SFI022");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail22_1'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin6');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var beanD = obj.data.items[0].data;
                        var title = 'Billing Date. : ' + beanD.strFormatDate + '   ' + ' Period : ' + beanD.PERNUM + '   ' + ' Source Code : ' + beanD.SOURCOD;
                        ;
                        Ext.getCmp(prototype.id + '-labelTitle6').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail22_1').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
    },
    onViewDetail: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var option = rowData.data.SOURCOD;

        switch (option) {
            case '01':
            case '02':
            case '03':
            case '08':
            case '14':
            case '21':
            case '23':
            case '25':
            case '26':
            case '90':
                me.drillDown.push(me.panelActual);
                me.panelActual = '-panelMainDataDetail20_1';
                global.selectedChild(me.childs, prototype.id + me.panelActual);
                me.paramsDetail.beanString = JSON.stringify(rowData.data);
                this.setGridDataDetail20_1();
                break

            case '04':
            case '05':
            case '06':
            case '44':
            case '45':
            case '46':
            case '91':
                me.drillDown.push(me.panelActual);
                me.panelActual = '-panelMainDataDetail21_1';
                global.selectedChild(me.childs, prototype.id + me.panelActual);
                me.paramsDetail.beanString = JSON.stringify(rowData.data);
                this.setGridDataDetail21_1();
                break;
            case '09':
            case '24':
            case '92':
            case '93':
            case '94':
                me.drillDown.push(me.panelActual);
                me.panelActual = '-panelMainDataDetail22_1';
                global.selectedChild(me.childs, prototype.id + me.panelActual);
                me.paramsDetail.beanString = JSON.stringify(rowData.data);
                this.setGridDataDetail22_1();
                break;
            default:
                global.Msg({
                    msg: 'Data not found.'
                });

        }
        console.log(rowData.data);
    },
    onFacsimilClick: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        var rec = rowData.data;
        console.log("Inicio de Facsimil");
        console.log(rec);
        var facsimilParams = {
            FUENTE: rec.DES_FTE.trim(),
            TDNR: rec.AIRNUM.substring(1, 4) + rec.TKTNUM.substring(1, 5) + rec.TKTNUM.substring(5, 11),
            CPUI: rec.CPNNUM.substring(1, 2),
            COUNTRY: '',
            HRED: '',
            consulta: '',
            strVTR: 'VTR',
            strFuente: '',
            typeModal: '',
            listaReg63: '',
            back: '',
            TicketPadre: ''
        };

        if (rec.AIRNUM.substring(1, 4) === '139') {
            facsimilParams.strVTR = 'VTR';
            facsimilParams.typeModal = '';
            facsimilParams.listaReg63 = '';
            facsimilParams.back = '';
            facsimilParams.TicketPadre = facsimilParams.TDNR;
            this.searchProrrateo(facsimilParams);

        } else {

            Ext.Ajax.request({
                url: prototype.url + '/searchFacsimil',
                method: 'POST',
                timeout: 60000000,
                beforerequest: Ext.getCmp(prototype.id + '-panelMain').mask('Loading...'),
                params: facsimilParams,
                success: function (response, options) {
                    var res = Ext.JSON.decode(response.responseText);
                    var beanFaximil = res.beanFaximil;
                    var facsimil = Ext.create('Ext.Praxis.view.flown.ElectronicMiscellaneousForm.Facsimil', {
                        id: prototype.id + '-facsimil',
                        params: {
                            beanFaximil: beanFaximil
                        }
                    });
                    facsimil.setId(prototype.id + "-facsimil");
                    facsimil.show();
                    Ext.getCmp(prototype.id + '-panelMain').unmask();
                }
            });
        }
    },
    searchProrrateo: function (facsimilParams) {

        var urls = this.obtenerUrls(facsimilParams);
        var URL1 = CONTEXTPATH + '/Prorrateo/' + urls.url1;
        var URL2 = CONTEXTPATH + '/Prorrateo/' + urls.url2;
        var paramsProrrateo = {
            beanFacProrrateo: "",
            beanRest: "",
            facsimilParams: facsimilParams
        };
        console.log("--------Controller EMD -----");
        console.log(facsimilParams);
        Ext.Ajax.request({
            url: URL1,
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-panelMain').mask('Loading...'),
            params: facsimilParams,
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var beanFacProrrateo = res.beanFacProrrateo;
                console.log("Resultado del primer AJAX - beanFacProrrateo");
                console.log(beanFacProrrateo);
                paramsProrrateo.beanFacProrrateo = beanFacProrrateo;
                if (urls.url2 !== "") {
                    Ext.getCmp(prototype.id + '-panelMain').unmask();
                    Ext.Ajax.request({
                        url: URL2,
                        method: 'POST',
                        timeout: 60000000,
                        beforerequest: Ext.getCmp(prototype.id + '-panelMain').mask('Loading...'),
                        params: facsimilParams,
                        success: function (response, options) {
                            var res = Ext.JSON.decode(response.responseText);
                            var beanRest = res.beanRest;
                            console.log("Resultado del segundo AJAX --- beanRest");
                            console.log(beanRest);
                            paramsProrrateo.beanRest = beanRest;
                            Ext.getCmp(prototype.id + '-panelMain').unmask();
                            var prorrateo = Ext.create('Ext.Praxis.view.flown.ElectronicMiscellaneousForm.Prorrateo', {
                                id: prototype.id + '-prorrateo',
                                params: {
//                                    paramsProrrateo: paramsProrrateo
                                    paramsProrrateo: ''
                                }
                            });
                            prorrateo.setId(prototype.id + "-prorrateo");
                            prorrateo.show();
                            Ext.getCmp(prototype.id + '-panelMain').unmask();
                        }
                    });
                } else {
                    Ext.getCmp(prototype.id + '-panelMain').unmask();
                    var prorrateo = Ext.create('Ext.Praxis.view.flown.ElectronicMiscellaneousForm.Prorrateo', {
                        id: prototype.id + '-prorrateo',
                        params: {
                            paramsProrrateo: paramsProrrateo
                        }
                    });
                    prorrateo.setId(prototype.id + "-prorrateo");
                    prorrateo.show();

                }

            }
        });



        console.log("URL 1 : " + urls.url1);
        console.log("URL 2 : " + urls.url2);

    },
    obtenerUrls: function (facsimilParams) {

        var urlProrrateo1 = '';
        var urlProrrateo2 = '';
        var fuente = facsimilParams.FUENTE;
        var back = facsimilParams.back;
        var backSub = back.substr(0, 8);
        var backSub2 = back.substr(8);

        console.log("fuente : " + fuente);
        console.log("back : " + back);
        console.log("backSub : " + backSub);
        console.log("backSub2 : " + backSub2);

        if (fuente.trim() === 'A' || fuente.trim() === 'ARC') {
            if (backSub === 'SALE_RFN') {
                if (backSub2 === '0') {
                    urlProrrateo1 = 'searchARC';
                    urlProrrateo2 = 'searchA713';
                }
            } else if (backSub === 'SALE_TKT') {
                if (backSub2 === '0') {
                    urlProrrateo1 = 'searchARC';
                    urlProrrateo2 = 'searchA720';
                }
            } else {
                urlProrrateo1 = 'searchARC';
                urlProrrateo2 = '';
            }
        } else {
            if (fuente.trim() === 'ASR' || fuente.trim() === 'S') {
                if (backSub === 'SALE_RFN') {
                    if (backSub2 === '0') {
                        urlProrrateo1 = 'searchASR';
                        urlProrrateo2 = 'searchA713';
                    }
                } else if (backSub === 'SALE_TKT') {
                    if (backSub2 === '0') {
                        urlProrrateo1 = 'searchASR';
                        urlProrrateo2 = 'searchA720';
                    }

                } else {
                    urlProrrateo1 = 'searchASR';
                    urlProrrateo2 = '';
                }
            } else {
                if (fuente.trim() === 'BSP' || fuente.trim() === 'B') {
                    if (backSub === 'SALE_RFN') {
                        if (backSub2 === '0') {
                            urlProrrateo1 = 'searchBSP';
                            urlProrrateo2 = 'searchA713';
                        }
                    } else if (backSub === 'SALE_TKT') {
                        if (backSub2 === '0') {
                            urlProrrateo1 = 'searchBSP';
                            urlProrrateo2 = 'searchA720';
                        }
                    } else {
                        urlProrrateo1 = 'searchBSP';
                        urlProrrateo2 = '';
                    }
                } else {
                    urlProrrateo1 = 'searchARC';
                    urlProrrateo2 = 'searchA720';
                }
            }
        }
        return {
            url1: urlProrrateo1,
            url2: urlProrrateo2
        };
    },
    validateFields: function () {
        var msj = '';
        return msj;
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
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbAerolinea').setValue('');
        Ext.getCmp(prototype.id + '-cmbPeriod').setValue('');

    },
    btnExcel_click: function (obj, e) {

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
        this.setFormatParameter();
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            case '-panelGridData2':
                global.getFile(prototype.url + '/getXLSX_2?beanString=' + searchParams.beanString);
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
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-panelPie').setWidth(ancho);
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
//            case  '-panelGridData':
//                me.pagginActual = '-paggin';
//                break;
            case '-panelGridData2':
                me.pagginActual = '-paggin2';
                break;
            case '-panelMainDataDetail':
                me.pagginActual = '-paggin3';
                break;
            case '-panelMainDataDetail20_1':
                me.pagginActual = '-paggin4';
                break;
            case '-panelMainDataDetail21_1':
                me.pagginActual = '-paggin5';
                break;
            case '-panelMainDataDetail22_1':
                me.pagginActual = '-paggin6';
                break;
            case '-panelMainDataDetail20':
                me.pagginActual = '-paggin7';
                break;
            case '-panelMainDataDetailbyCIA':
                me.pagginActual = '-paggin9';
                break;
            case '-panelMainDataDetailbySOURCE':
                me.pagginActual = '-paggin10';
                break;
            case '-panelMainDataDetail20bySO':
                me.pagginActual = '-paggin11';
                break;
        }
    },
    
    onDownLoad: function(grid, rowIndex, colIndex) {
        
        
        var rec = grid.getStore().getAt(rowIndex);
//        console.log(rec);
        console.log(rec.data.A1964FCONT);
        console.log(rec.data.A1964TUSO);
        
        var FCONT = rec.data.A1964FCONT.substr(2,2) + rec.data.A1964FCONT.substr(4,2) + '00';
        console.log(FCONT);
        
        this.beanExcel.BDATE = FCONT;
        this.beanExcel.SOURCOD = rec.data.A1964TUSO;
        me.paramsExcel.beanString = JSON.stringify(this.beanExcel);
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Export to excel?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel_IXC();
                }
            }
        });
    },
    exportExcel_IXC: function() {

//        switch (me.panelActual) {
//            case  '-panelGridData':
//                global.getFile(prototype.url + '/searchDetTicketExcel?beanString=' + searchParams.beanString);
//                break;
//            case  '-boxMainDataPriDet':
                global.getFile(prototype.url + '/downloadExcelXcobrar?beanString=' + me.paramsExcel.beanString);
//                break;
//        }

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
    findSource: function (obj, e, eOpts) {
        
        var cmbPEREST = Ext.getCmp(prototype.id + '-cmbPEREST').getValue();
        if(cmbPEREST !== ''){
            switch (e.getKey()) {
                case 13:
                    this.btnSearch_click();
                    break;
            }
        }
    }

});
