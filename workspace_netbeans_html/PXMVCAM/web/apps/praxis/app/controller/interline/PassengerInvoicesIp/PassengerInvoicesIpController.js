/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.interline.PassengerInvoicesIp.PassengerInvoicesIpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PassengerInvoicesIpController',
    fecha: new Date(),
    childs: '',
    bean: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    me: '', //
    searchParams: {},
    searchParamsAnual: {},
    paramsDetail: {},
    paramsDetailExcel: {},
    bean20: {},
    bean21: {},
    beanExcel: {},
    beanDetail: {},
    init: function(view) {
        me = this;//
        prototype.id = 'PassengerInvoicesIpForm'; //
        prototype.url = CONTEXTPATH + '/PassengerInvoicesIp';//
        prototype.urlMaster = CONTEXTPATH + '/MasterController';//
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
            // -------------------Eventos Genericos --------------------
            '#PassengerInvoicesIpForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#PassengerInvoicesIpForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#PassengerInvoicesIpForm-btnClear': {
                click: this.btnClear_click
            },
            '#PassengerInvoicesIpForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#PassengerInvoicesIpForm-btnTxt': {
                click: this.btnTxt_click
            },
            '#PassengerInvoicesIpForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#PassengerInvoicesIpForm-btnBack': {
                click: this.btnBack_click
            },
            '#PassengerInvoicesIpForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#PassengerInvoicesIpForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#PassengerInvoicesIpForm-btn-pag-next': {
                click: this.pagNext
            },
            '#PassengerInvoicesIpForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#PassengerInvoicesIpForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#PassengerInvoicesIpForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#PassengerInvoicesIpForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#PassengerInvoicesIpForm-chckBtn': {
                change: this.onChckBtn
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onChckBtn: function(obj, value) {
        if (value) {
            Ext.getCmp(prototype.id + '-cmbSource').show();
        } else {
            Ext.getCmp(prototype.id + '-cmbSource').hide();
        }
        this.btnSearch_click();
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function(obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    setStoreData: function() {

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");


        var cmbPeriod = Ext.getCmp(prototype.id + '-cmbPeriod');
        cmbPeriod.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["01", "01"],
                ["02", "02"],
                ["03", "03"],
                ["04", "04"]
            ]
        }));
        cmbPeriod.setValue("");

        var cmbPMI = Ext.getCmp(prototype.id + '-cmbPMI');
        cmbPMI.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["M", "M"],
                ["S", "S"],
                ["T", "T"],
                ["Z", "Z"]
            ]
        }));
        cmbPMI.setValue("");

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainDataAirline_Source',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: '',
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lstAirlines = res.lstAirlines;
                var lstSource = res.lstSource;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstAirlines,
                    autoLoad: true
                });
                var storeData2 = Ext.create('Ext.data.Store', {
                    data: lstSource,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbAerolinea').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbSource').bindStore(storeData2);
                Ext.getCmp(prototype.id + '-cmbAerolinea').setValue('');
                Ext.getCmp(prototype.id + '-cmbSource').setValue(storeData2.data.items[0].data.CODSOUR);
                global.clear();
                me.btnSearch_click();
            }
        });
    },
    btnSearch_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-panelPie').show();
        
        var cmbFindBy = Ext.getCmp(prototype.id + '-cmbFindBy').getValue();
        if(cmbFindBy === ''){
            Ext.getCmp(prototype.id + '-txtTKT').setValue('');
            Ext.getCmp(prototype.id + '-txtRej').setValue('');
        }
        
        this.setFormatParameter();
        
        if (me.bean.chckBtn) {
            this.setGridDataBySource();
        } else {
            var ticket = Ext.getCmp(prototype.id + '-txtTKT').getValue();
            if(ticket !== ''){
                if (ticket.length === 13) {
                    this.searchTKT();
                } else {
                    global.Msg({msg: 'Ticket number must contain 13 digits.'});
                }
            }else{
                this.setGridData();
            }
        }

//        this.BuscarTKT_keyDownHandler();

    },
    setFormatParameter: function() {

        me.bean = {};
        me.bean.yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        me.bean.monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        me.bean.monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.SOURCOD = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        me.bean.VALDPMI = Ext.getCmp(prototype.id + '-cmbPMI').getValue();
        me.bean.BAIR = Ext.getCmp(prototype.id + '-cmbAerolinea').getValue();
        me.bean.PERNUM = Ext.getCmp(prototype.id + '-cmbPeriod').getValue();
//        me.bean.IN_TKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        me.bean.chckBtn = Ext.getCmp(prototype.id + '-chckBtn').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString
        };
        console.log(searchParams);
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    setGridData: function() {
        win.lblUser_toolTip("Estructura: SFI040");
        me.setWidthPie();
        me.panelActual = '-panelGridData';
        me.drillDown.push(me.panelActual);
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin');
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
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="setGridDataBySource">
    setGridDataBySource: function() {
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
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
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

    searchTKT: function() {
        this.bean20.IN_TKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        me.panelActual = '-boxTKT';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchTKT'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(me.bean20)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    Ext.getCmp(prototype.id + '-panelPie').hide();
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
    setGridDataDetailSFI30: function(data) {
        win.lblUser_toolTip("Estructura: SFI030");
        me.setWidthPie();
        console.log(me.paramsDetail);
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail30'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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
    onViewDataDetailSFI30: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMainDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetailSFI30();
    },
    setGridDataDetail20: function(data) {
        win.lblUser_toolTip("Estructura: SFI020");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail20'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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
    onViewDataDetailSFI20: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMainDataDetail20';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetail20();
    },
    setGridDataDetaiSFI41: function(data) {
        win.lblUser_toolTip("Estructura: SFI041");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail41'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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
    onViewDataDetailSFI41: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMainDataDetailSFI41';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetaiSFI41();
    },
    setGridDataDetail21: function(data) {
        win.lblUser_toolTip("Estructura: SFI021");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail21'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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
    onViewDataDetailSFI21: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMainDataDetail21';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetail21();
    },
    setGridDataDetail22: function(data) {
        win.lblUser_toolTip("Estructura: SFI022");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail22'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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
    onViewDataDetailSFI22: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMainDataDetail22';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetail22();
    },
    setGridDataDetail30ByCia: function(data) {
        win.lblUser_toolTip("Estructura: SFI030");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail30byCIA'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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
    onViewDetailCIA: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMainDataDetailbyCIA';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetail30ByCia();
    },
    setGridDataDetail30BySOURCE: function(data) {
        win.lblUser_toolTip("Estructura: SFI030");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail30bySOURCE'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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
    onViewDetailbySOURCE: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMainDataDetailbySOURCE';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetail30BySOURCE();
    },
    setGridDataDetail20bySO: function(data) {
        win.lblUser_toolTip("Estructura: SFI020");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail20bySO'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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
    setGridDataDetail21bySO: function(data) {
        win.lblUser_toolTip("Estructura: SFI021");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail21bySO'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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
    setGridDataDetail22bySO: function(data) {
        win.lblUser_toolTip("Estructura: SFI022");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail22bySO'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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
    onViewDetailbyCIASOURCE: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

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
    setGridDataSource: function(bean) {



        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchSourceDetail'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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
            case '31':
            case '90':
            case '95':
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
            case '92':
            case '93':
                me.panelActual = '-panelMainDataDetail21';
                win.lblUser_toolTip("Estructura: SFI021");
                global.selectedChild(me.childs, prototype.id + me.panelActual);
                me.setWidthPie();
                Ext.getCmp(prototype.id + '-gridDataDetail21').bindStore(storeGridDatas);
                break;
            case '09':
            case '24':
//            case '92':
//            case '93':
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
    onViewDataSource: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        // me.panelActual = '-panelMainDataDetailbySOURCE';
        //global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataSource(rowData.data);
    },
    setGridDataDetail20_1: function(data) {
        win.lblUser_toolTip("Estructura: SFI020");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail20_1'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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
    setGridDataDetail21_1: function(data) {
        win.lblUser_toolTip("Estructura: SFI021");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail211'
            }, listeners: {
                beforeload: function(obj) {
                    console.log('-----------------------------------');
                    console.log(me.paramsDetail);
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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
    setGridDataDetail22_1: function(data) {
        win.lblUser_toolTip("Estructura: SFI022");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchdDetail22_1'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
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
    onViewDetail: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

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
            case '31':
            case '90':
            case '95':
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
            case '92':
            case '93':
                me.drillDown.push(me.panelActual);
                me.panelActual = '-panelMainDataDetail21_1';
                global.selectedChild(me.childs, prototype.id + me.panelActual);
                me.paramsDetail.beanString = JSON.stringify(rowData.data);
                this.setGridDataDetail21_1();
                break;
            case '09':
            case '24':
//            case '92':
//            case '93':
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
//    onFacsimilClick: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
//        var rec = rowData.data;
//        console.log("Inicio de Facsimil");
//        console.log(rec);
//        var facsimilParams = {
//            FUENTE: rec.DES_FTE.trim(),
//            TDNR: rec.AIRNUM.substring(1, 4) + rec.TKTNUM.substring(1, 5) + rec.TKTNUM.substring(5, 11),
//            CPUI: rec.CPNNUM.substring(1, 2),
//            COUNTRY: '',
//            HRED: '',
//            consulta: '',
//            strVTR: 'VTR',
//            strFuente: '',
//            typeModal: '',
//            listaReg63: '',
//            back: '',
//            TicketPadre: ''
//        };
//
//        if (rec.AIRNUM.substring(1, 4) === '139') {
//            facsimilParams.strVTR = 'VTR';
//            facsimilParams.typeModal = '';
//            facsimilParams.listaReg63 = '';
//            facsimilParams.back = '';
//            facsimilParams.TicketPadre = facsimilParams.TDNR;
//            this.searchProrrateo(facsimilParams);
//
//        } else {
//
//            Ext.Ajax.request({
//                url: prototype.url + '/searchFacsimil',
//                method: 'POST',
//                timeout: 60000000,
//                beforerequest: Ext.getCmp(prototype.id + '-panelMain').mask('Loading...'),
//                params: facsimilParams,
//                success: function(response, options) {
//                    var res = Ext.JSON.decode(response.responseText);
//                    var beanFaximil = res.beanFaximil;
//                    var facsimil = Ext.create('Ext.Praxis.view.flown.ElectronicMiscellaneousForm.Facsimil', {
//                        id: prototype.id + '-facsimil',
//                        params: {
//                            beanFaximil: beanFaximil
//                        }
//                    });
//                    facsimil.setId(prototype.id + "-facsimil");
//                    facsimil.show();
//                    Ext.getCmp(prototype.id + '-panelMain').unmask();
//                }
//            });
//        }
//    },
    gridData_VIEWTKT_clickHandler: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        console.log(data);
        var strTkt = data.TKT;
        console.log(strTkt);
        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = strTkt.substr(1, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(6, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(10, 6);
        beanProMasterTicket.IN_SEQ = '00';

        console.log(beanProMasterTicket);
        prototypeProgram.view = 'interline-passenger-invoices-ip-form';
        prototypeProgram.nprog = 'PX00000190';
        prototypeProgram.title = 'Passenger Invoices';
        prototypeProgram.modulo = '';

        win.displayProMasterTicket(this, 'PassengerInvoicesIP', beanProMasterTicket);
    },
    searchProrrateo: function(facsimilParams) {

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
            success: function(response, options) {
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
                        success: function(response, options) {
                            var res = Ext.JSON.decode(response.responseText);
                            var beanRest = res.beanRest;
                            console.log("Resultado del segundo AJAX --- beanRest");
                            console.log(beanRest);
                            paramsProrrateo.beanRest = beanRest;
                            Ext.getCmp(prototype.id + '-panelMain').unmask();
                            var prorrateo = Ext.create('Ext.Praxis.view.flown.ElectronicMiscellaneousForm.Prorrateo', {
                                id: prototype.id + '-prorrateo',
                                params: {
                                    paramsProrrateo: paramsProrrateo
//                                    paramsProrrateo: ''
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
    viewDetailSFI031: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        var bean21 = {};
        bean21 = rowData.data;
        this.loadlstSFI031(bean21);
    },
    loadlstSFI031: function(bean21) {
        Ext.Ajax.request({
            url: prototype.url + '/loadlstSFI031',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean21)},
            beforerequest: (Ext.getCmp(prototype.id + '-gridDataDetail21bySO').mask('Loading...'),
                    Ext.getCmp(prototype.id + '-gridDataDetail21').mask('Loading...')
                    ),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-gridDataDetail21bySO').unmask();
                Ext.getCmp(prototype.id + '-gridDataDetail21').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    var objSFI031 = res.result;
                    if (objSFI031 !== null) {
                        Ext.create('Ext.Praxis.view.interline.PassengerInvoicesIpForm.DataEntry', {
                            id: prototype.id + '-dataEntry',
                            params: {
                                bean: objSFI031
                            }
                        }).show();
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-gridDataDetail21bySO').unmask();
                Ext.getCmp(prototype.id + '-gridDataDetail21').unmask();
            }
        });
    },
    viewDetailSFI031_1: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        var bean21 = {};
        bean21 = rowData.data;
        this.loadlstSFI031_1(bean21);
    },
    loadlstSFI031_1: function(bean21) {
        Ext.Ajax.request({
            url: prototype.url + '/loadlstSFI031_1',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean21)},
            beforerequest: (Ext.getCmp(prototype.id + '-gridDataDetail22').mask('Loading...'),
                    Ext.getCmp(prototype.id + '-gridDataDetail22bySO').mask('Loading...')
                    ),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-gridDataDetail22').unmask();
                Ext.getCmp(prototype.id + '-gridDataDetail22bySO').unmask();

                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    var objSFI031 = res.result;
                    if (objSFI031 !== null) {
                        Ext.create('Ext.Praxis.view.interline.PassengerInvoicesIpForm.DataEntry', {
                            id: prototype.id + '-dataEntry',
                            params: {
                                bean: objSFI031
                            }
                        }).show();
                    } else {
                        global.Msg(
                                {msg: 'Data not found'});
                    }
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-gridDataDetail22').unmask();
                Ext.getCmp(prototype.id + '-gridDataDetail22bySO').unmask();
            }
        });
    },
    obtenerUrls: function(facsimilParams) {

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
            }
            else if (backSub === 'SALE_TKT') {
                if (backSub2 === '0') {
                    urlProrrateo1 = 'searchARC';
                    urlProrrateo2 = 'searchA720';
                }
            }
            else {
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
                }
                else if (backSub === 'SALE_TKT') {
                    if (backSub2 === '0') {
                        urlProrrateo1 = 'searchASR';
                        urlProrrateo2 = 'searchA720';
                    }

                }
                else {
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
                    }
                    else if (backSub === 'SALE_TKT') {
                        if (backSub2 === '0') {
                            urlProrrateo1 = 'searchBSP';
                            urlProrrateo2 = 'searchA720';
                        }
                    }
                    else {
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
    openExport: function(grid, rowIndex, colIndex) {
        this.beanDetail = grid.getStore().getAt(rowIndex).data;
        var BDATE = this.beanDetail.BDATE;

        var fecha = '20' + BDATE.substr(0, 4)
        var fuente = this.beanDetail.PERNUM;
        var ccust = '139';
//        
        Ext.create('Ext.Praxis.view.interline.PassengerInvoicesIpForm.DataEntryEx', {
            id: 'DataEntryExPassengerInvoicesIpForm',
            params: {
                strFecha: fecha,
                strFuente: fuente,
                strccust: ccust
            }
        }).show();
        this.exportFile1(ccust, fecha, fuente);
    },
    exportFile1: function(strcia, strFecha, strPeriodo) {
        Ext.Ajax.request({
            url: prototype.url + '/exportFile1',
            method: 'POST',
            timeout: 60000000,
            params: {strcia: strcia, strFecha: strFecha, strPeriodo: strPeriodo},
            beforerequest: Ext.getCmp('DataEntryExPassengerInvoicesIpForm').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp('DataEntryExPassengerInvoicesIpForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var listaFile = res.listaArray;
                    if (listaFile.length > 0) {
                        Ext.getCmp(prototype.id + '-gridFileNames').bindStore(
                                Ext.create("Ext.Praxis.store.interline.GridData", {data: listaFile})
                                );
                        meEntryIp.strFormatDate = listaFile[0].strFormatDate;
                        meEntryIp.str = res.str;
                    } else {
                        global.Msg({msg: 'This File has not been created.'});
                        meEntryIp.btnCancel_clickHandler();
                    }
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                Ext.getCmp('DataEntryPassengerInvoicesForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    openExportManyExcels: function(grid, rowIndex, colIndex) {
        
        var flagByMonth = "";
        
        this.beanDetail = grid.getStore().getAt(rowIndex).data;
        this.beanExcel.BDATE = this.beanDetail.BDATE;
        this.beanExcel.PERNUM = this.beanDetail.PERNUM;
        
        me.paramsDetailExcel.beanString = JSON.stringify(this.beanExcel);
        
        if(colIndex === 12){
            flagByMonth = "Y";
            global.getFile(prototype.url + '/downloadTxt?beanString=' + me.paramsDetailExcel.beanString + '&flagByMonth=' + flagByMonth);
        }else{
            flagByMonth = "";
            global.getFile(prototype.url + '/downloadXlsxs?beanString=' + me.paramsDetailExcel.beanString + '&flagByMonth=' + flagByMonth);
        }
        
       
    },
    openExport20: function(grid, rowIndex, colIndex) {
        this.beanDetail = grid.getStore().getAt(rowIndex).data;
        this.beanExcel.BDATE = this.beanDetail.BDATE;
        this.beanExcel.PERNUM = this.beanDetail.PERNUM;
//        
        me.paramsDetailExcel.beanString = JSON.stringify(this.beanExcel);
        var flag = false;
        global.getFile(prototype.url + '/downloadXLSX_20?beanString=' + me.paramsDetailExcel.beanString);
//       
    },
    openExport21: function(grid, rowIndex, colIndex) {
        this.beanDetail = grid.getStore().getAt(rowIndex).data;
        this.beanExcel.BDATE = this.beanDetail.BDATE;
        this.beanExcel.PERNUM = this.beanDetail.PERNUM;
//        
        me.paramsDetailExcel.beanString = JSON.stringify(this.beanExcel);
        var flag = false;
        global.getFile(prototype.url + '/downloadXLSX_21?beanString=' + me.paramsDetailExcel.beanString);
//       
    },
    openExport41: function(grid, rowIndex, colIndex) {
        this.beanDetail = grid.getStore().getAt(rowIndex).data;
        this.beanExcel.BDATE = this.beanDetail.BDATE;
        this.beanExcel.PERNUM = this.beanDetail.PERNUM;
//        
        me.paramsDetailExcel.beanString = JSON.stringify(this.beanExcel);
        var flag = false;
        global.getFile(prototype.url + '/downloadXLSX_41?beanString=' + me.paramsDetailExcel.beanString);
//       
    },
    validateFields: function() {
        var msj = '';
        return msj;
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

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbAerolinea').setValue('');
        Ext.getCmp(prototype.id + '-cmbPeriod').setValue('');
        Ext.getCmp(prototype.id + '-cmbFindBy').setValue('');
        Ext.getCmp(prototype.id + '-txtTKT').setValue('');

    },
    btnTxt_click: function(obj, e) {

//        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download TXT anual ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        this.exportTXT();
                    }
                }
            });
        }
    },
    exportTXT: function(obj, e) {        
        me.bean = {};
        me.bean.BDATE = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();

        var beanString = JSON.stringify(me.bean);
        searchParamsAnual = {
            beanString: beanString
        };
        console.log(searchParamsAnual);
        
        global.getFile(prototype.url + '/downloadTxt?beanString=' + searchParamsAnual.beanString + '&flagByMonth=A' );
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
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            case '-panelGridData2':
                global.getFile(prototype.url + '/getXLSX_2?beanString=' + searchParams.beanString);
                break;
            case '-panelMainDataDetail':
                global.getFile(prototype.url + '/getXLSX_Detail30?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelMainDataDetail20_1':
                global.getFile(prototype.url + '/getXLSX_Detail30_1?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelMainDataDetail20':
                global.getFile(prototype.url + '/getXLSX_Detail20?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelMainDataDetailbyCIA':
                global.getFile(prototype.url + '/getXLSX_DetailbyCIA?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelMainDataDetailbySOURCE':
                global.getFile(prototype.url + '/getXLSX_DetailbySOURCE?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelMainDataDetail21bySO':
                global.getFile(prototype.url + '/getXLSX_DetailbySO?beanString=' + me.paramsDetail.beanString);
                break;
            case '-panelMainDataDetail20bySO':
                global.getFile(prototype.url + '/getXLSX_Detail20bySO?beanString=' + me.paramsDetail.beanString);
                break;
//            case '-panelGridDataByCia':
//                global.getFile(prototype.url + '/getXLSXCia?beanString=' + me.paramsDetail.beanString);
//                break;
//            case '-panelGridDataByReason':
//                global.getFile(prototype.url + '/getXLSXReason?beanString=' + me.paramsDetail.beanString);
//                break;
//            default:
//                global.Msg(
//                    {msg: 'Under Construction'
//                });
        }

    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function() {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-panelPie').setWidth(ancho);
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
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
    },
    BuscarTKT_keyDownHandler: function(obj, e, eOpts) {
        switch (e.getKey()) {
            case 13:
                if (Ext.getCmp(prototype.id + '-txtTKT').getValue().length === 13) {
                    this.searchTKT();
                } else {
                    global.Msg({
                        msg: 'Ticket number must contain 13 digits.'
                    });
                }
                break;
        }
    },
    cmbFind_changeHandler: function() {
        var cmbFindBy = Ext.getCmp(prototype.id + '-cmbFindBy').getValue();
        if (cmbFindBy === "TICKET") {
            Ext.getCmp(prototype.id + '-txtRej').hide();
//            Ext.getCmp(prototype.id+'-lblTkt').show();
            Ext.getCmp(prototype.id + '-txtTKT').show();
            Ext.getCmp(prototype.id + '-lblTkt').setText("Ticket:");
            Ext.getCmp(prototype.id + '-txtTKT').setValue('');
        } else if (cmbFindBy === "REJ") {
            Ext.getCmp(prototype.id + '-txtTKT').hide();
            Ext.getCmp(prototype.id + '-lblTkt').setText("Rej Number:");
//            Ext.getCmp(prototype.id+'-lblTkt').show();
            Ext.getCmp(prototype.id + '-txtRej').show();
            Ext.getCmp(prototype.id + '-txtRej').setValue("");
        } else {
//            Ext.getCmp(prototype.id+'-lblTkt').hide();
            Ext.getCmp(prototype.id + '-txtTKT').hide();
            Ext.getCmp(prototype.id + '-txtRej').hide();
        }
    },
    searchRejection: function(obj, e, eOpts) {
        var cmbFindBy = Ext.getCmp(prototype.id + '-cmbFindBy').getValue();
        if (cmbFindBy === "REJ") {
            if (e.getKey() === 13) {
//                if (Ext.getCmp(prototype.id + '-txtRej').getValue().trim().length === 10) {
                this.bean21.REJNUMBER = Ext.getCmp(prototype.id + '-txtRej').getValue();
                this.searchRejected(this.bean21);
//                } else {
//                    Ext.getCmp(prototype.id + '-txtRej').setValue('');
//                    global.Msg({msg: 'Reject number must contain 10 digits.'});
//                }
            }
        }
    },
    searchRejected: function(bean21) {
        me.panelActual = '-panelMainDataDetail21';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchRejected'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean21)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    Ext.getCmp(prototype.id + '-panelPie').hide();
                    win.lblUser_toolTip("Estructura: SFI021");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            //me.selectedChild(me.childs, prototype.id + me.panelActual);
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
        Ext.getCmp(prototype.id + '-gridDataDetail21').bindStore(storeGridDatas);
//      Ext.getCmp(prototype.id + '-paggin13').bindStore(storeGridDatas);
    },
});
