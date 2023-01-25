/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.Inputs.InputsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InputsController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanCity: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    reg99: 0,
    error: '',
    Fuente: '',
    me: '',
    beanDeliv: {},
    searchParams: {},
    searchParamsCity: {},
    paramsDetail: {},
    dataObtain: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'InputsForm';
        prototype.url = CONTEXTPATH + '/Inputs';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-boxMainAll';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#InputsForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#InputsForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#InputsForm-btnClear': {
                click: this.btnClear_click
            },
            '#InputsForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#InputsForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#InputsForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#InputsForm-btnBack': {
                click: this.btnBack_click
            },
            '#InputsForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#InputsForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#InputsForm-btn-pag-next': {
                click: this.pagNext
            },
            '#InputsForm-btn-pag-last': {
                click: this.pagLast
            },
            '#InputsForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth
            },
            '#InputsForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth
            },
            '#InputsForm-cmbYear': {
                afterrender: this.afterRenderYear
            }
        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
        Ext.getCmp(prototype.id + '-contentFilter2').hide();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    cbxDateFromMonth_Change: function () {
        this.setValue('cmbDateToMonth', this.getValue("cmbDateFromMonth"));
    },
    cbxDateFromMonth_Day: function () {
        this.setValue('cmbDateToDay', this.getValue("cmbDateFromDay"));
    },
    ChangeVista_clickHandler: function () {
        var cmbVISTA = Ext.getCmp(prototype.id + '-cmbVISTA').getValue();
        if (cmbVISTA === 'D') {
            Ext.getCmp(prototype.id + '-boxMainAll').hide();
        } else {
            Ext.getCmp(prototype.id + '-boxMainAll').hide();
        }
        this.btnSearch_click();
    },
    obtainData: function () {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);
        
        var month = this.fecha.getMonth() + 1;
        
        if (month < 10) {
            month = '0' + month;
        }

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');

        Ext.getCmp(prototype.id + '-cmbYear').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbYear').setValue(this.fecha.getFullYear());

        var cmbVISTA = Ext.getCmp(prototype.id + '-cmbVISTA');
        cmbVISTA.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["D", "Detail"],
                ["C", "Calendar"]
            ]
        }));
        cmbVISTA.setValue("D");


        var IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        var IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        var consulta = '1';



        Ext.Ajax.request({
            url: prototype.url + '/obtainDataCombo',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-centerC').mask('Loading...'),
            params: {IN_FECHA_FROM: IN_FECHA_FROM,
                IN_FECHA_TO: IN_FECHA_TO,
                consulta: consulta},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.id + '-centerC').unmask('Loading...');

                if (res.success) {
//                    var lstProgramas = res.lstProgramas;
                    Ext.getCmp(prototype.id + '-cmbFUENTE').bindStore(
                            Ext.create('Ext.data.Store',
                                    {data: res.lstFuentes, autoLoad: true}));

                    Ext.getCmp(prototype.id + '-cmbCountry').bindStore(
                            Ext.create('Ext.data.Store',
                                    {data: res.lstPaises, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-cmbFUENTE').setValue('All');
                    Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                    me.btnSearch_click();
                } else
                    global.Msg({msg: 'Ocurrio un error'});
            }
        });
    },
    setFormatParameter1: function () {

        me.beanCity = {};

        me.beanCity.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        me.beanCity.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        me.beanCity.IN_PAIS = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.beanCity.IN_FPROC = Ext.getCmp(prototype.id + '-txtDateField').getValue();

        me.beanCity.IN_FUENTE = Ext.getCmp(prototype.id + '-cmbFUENTE').getValue();


        var beanString = JSON.stringify(me.beanCity);
        searchParams = {
            beanCity: me.beanCity,
            beanString: beanString
        };
    },
    setFormatParameter2: function () {
        me.bean = {};
        var fte = Ext.getCmp(prototype.id + '-cmbFUENTE').getValue();
        if (fte === 'All') {
            me.bean.IN_FUENTE = '';
        } else {
            me.bean.IN_FUENTE = fte;
        }

        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
    },
    btnSearch_click: function (obj, e) {

        var chkCITY = Ext.getCmp(prototype.id + '-chkCITY').getValue();
        var chkLOG = Ext.getCmp(prototype.id + '-chkLOG').getValue();
        var cmbVISTA = Ext.getCmp(prototype.id + '-cmbVISTA').getValue();
        var FUENTE = Ext.getCmp(prototype.id + '-cmbFUENTE').getValue();
//        console.log(FUENTE);

        if (chkCITY) {
            Ext.getCmp(prototype.id + '-txtDateField').setVisible(true);
            Ext.getCmp(prototype.id + '-cmbCountry').setVisible(true);
            this.setGridDataCity();
        } else {
            this.setFormatParameter2();
            if (me.bean.IN_FUENTE.substr(0, 7) === 'BSPLINK') {
                Ext.getCmp(prototype.id + '-chkCITY').setVisible(true);
            } else {
                Ext.getCmp(prototype.id + '-chkCITY').setVisible(false);
            }

            if (chkLOG) {
                me.bean.MENSA = Ext.getCmp(prototype.id + '-cmbPrograma').getValue();
                this.setGridDataLOGSA2270();
            } else {
                var beanString = JSON.stringify(me.bean);
                searchParams = {
                    bean: me.bean,
                    beanString: beanString
                };

                if (cmbVISTA === 'D') {
                    Ext.getCmp(prototype.id + '-Filters3_1').show();
                    Ext.getCmp(prototype.id + '-contentFilter2').hide();
                    this.setGridData();
                } else {
                    if (FUENTE !== 'All') {
                        Ext.getCmp(prototype.id + '-Filters3_1').hide();
                        Ext.getCmp(prototype.id + '-contentFilter2').show();
                        Ext.getCmp(prototype.id + '-boxMainAll').hide();
                        Ext.getCmp(prototype.id + '-panelGridData').hide();
                        this.gridCalendar_clickHandler();
                    } else {
                        global.Msg({msg: 'Select source'});
                    }
                }
            }
            Ext.getCmp(prototype.id + '-txtDateField').setVisible(false);
            Ext.getCmp(prototype.id + '-cmbCountry').setVisible(false);
        }
    },
    setGridData: function () {
        win.lblUser_toolTip("Estructura: A2270");
        var FUENTE = Ext.getCmp(prototype.id + '-cmbFUENTE').getValue();

//        me.drillDown.push(me.panelActual);
        if (FUENTE === 'All') {
            me.panelActual = '-boxMainAll';
        } else {
            me.panelActual = '-panelGridData';
        }
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
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
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridMainDataAll').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
        }
    },
    searchDetAll_clickHandler: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        var beanDetAll = rowData.data;
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetailAll';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        switch (columnNum) {
            case 3:
                beanDetAll.IN_ERROR = 'R';
                if (rowData.data.QRECT === 0) {
                    global.Msg({msg: 'Data not found.'});
                } else {
                    me.paramsDetail.beanString = JSON.stringify(beanDetAll);
                    this.searchDetAll();
                }
                break;
            case 4:
                beanDetAll.IN_ERROR = 'RL';
                if (rowData.data.QRECL === 0) {
                    global.Msg({msg: 'Data not found.'});
                } else {
                    me.paramsDetail.beanString = JSON.stringify(beanDetAll);
                    this.searchDetAll();
                }
                break;
            case 5:
                beanDetAll.IN_ERROR = 'RN';
                if (rowData.data.QRECN === 0) {
                    global.Msg({msg: 'Data not found.'});
                } else {
                    me.paramsDetail.beanString = JSON.stringify(beanDetAll);
                    this.searchDetAll();
                }
                break;
            case 6:
                beanDetAll.IN_ERROR = 'RE';
                if (rowData.data.QRECE === 0) {
                    global.Msg({msg: 'Data not found.'});
                } else {
                    me.paramsDetail.beanString = JSON.stringify(beanDetAll);
                    this.searchDetAll();
                }
                break;


            case 8:
                beanDetAll.IN_ERROR = 'C';
                if (rowData.data.QCONT === 0) {
                    global.Msg({msg: 'Data not found.'});
                } else {
                    me.paramsDetail.beanString = JSON.stringify(beanDetAll);
                    this.searchDetAll();
                }
                break;
            case 9:
                beanDetAll.IN_ERROR = 'CL';
                if (rowData.data.QCONL === 0) {
                    global.Msg({msg: 'Data not found.'});
                } else {
                    me.paramsDetail.beanString = JSON.stringify(beanDetAll);
                    this.searchDetAll();
                }
                break;
            case 10:
                beanDetAll.IN_ERROR = 'CN';
                if (rowData.data.QCONN === 0) {
                    global.Msg({msg: 'Data not found.'});
                } else {
                    me.paramsDetail.beanString = JSON.stringify(beanDetAll);
                    this.searchDetAll();
                }
                break;
            case 11:
                beanDetAll.IN_ERROR = 'CE';
                if (rowData.data.QCONE === 0) {
                    global.Msg({msg: 'Data not found.'});
                } else {
                    me.paramsDetail.beanString = JSON.stringify(beanDetAll);
                    this.searchDetAll();
                }
                break;


            case 12:
                beanDetAll.IN_ERROR = 'B';
                if (rowData.data.QBSPT === 0) {
                    global.Msg({msg: 'Data not found.'});
                } else {
                    me.paramsDetail.beanString = JSON.stringify(beanDetAll);
                    this.searchDetAll();
                }
                break;
            case 13:
                beanDetAll.IN_ERROR = 'BL';
                if (rowData.data.QBSPL === 0) {
                    global.Msg({msg: 'Data not found.'});
                } else {
                    me.paramsDetail.beanString = JSON.stringify(beanDetAll);
                    this.searchDetAll();
                }
                break;
            case 14:
                beanDetAll.IN_ERROR = 'BE';
                if (rowData.data.QBSPE === 0) {
                    global.Msg({msg: 'Data not found.'});
                } else {
                    me.paramsDetail.beanString = JSON.stringify(beanDetAll);
                    this.searchDetAll();
                }
                break;
        }
    },
    searchDetAll: function () {
        win.lblUser_toolTip("Estructura: A2359");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetAll'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                        console.log(obj.data.items[0].data);
                        var data = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridDataDetailAll').setTitle('<center style="font-size:12px;"> ' + data.strTitulo + '</center>');
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailAll').bindStore(storeGridDatas);

    },

    setGridDataCity: function () {
        me.beanCity = {};
        me.beanCity.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        me.beanCity.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        me.beanCity.IN_PAIS = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        var FPROC = Ext.getCmp(prototype.id + '-txtDateField').getValue();
        me.beanCity.IN_FPROC = Ext.util.Format.date(FPROC, 'Ymd');

        var beanString = JSON.stringify(me.beanCity);
        searchParamsCity = {
            bean: me.beanCity,
            beanString: beanString
        };

        win.lblUser_toolTip("Estructura: A3382");
        me.panelActual = '-boxDataCity';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

//        console.log(searchParamsCity);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchCity'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParamsCity;
                    },
                    load: function (obj) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
//                        console.log(obj.data.items[0].data);
                            var data = obj.data.items[0].data;
//                        Ext.getCmp(prototype.id + '-gridDataDetailAll').setTitle('<center style="font-size:12px;"> ' + data.strTitulo + '</center>');
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataCity').bindStore(storeGridDatas);
        }
    },

    gridCalendar_clickHandler: function (obj) {
        Ext.getCmp(prototype.id + '-Filters3_2').show();
        Ext.getCmp(prototype.id + '-infoCalendar').show();

        this.setCalendar2();
        global.clear();
    },

    setClearCalendar: function () {
        console.log('setClearCalendar');
        for (var i = 1; i <= 42; i++) {
            for (var j = 1; j <= 12; j++) {
                Ext.getCmp(prototype.id + '-lblDay_' + j + '_' + i).setText('.');
                Ext.getCmp(prototype.id + '-lblDay_' + j + '_' + i).setStyle('backgroundColor', '#E5ECEF');
                Ext.getCmp(prototype.id + '-lblDay_' + j + '_' + i).setStyle('color', '#E5ECEF');
                Ext.getCmp(prototype.id + 'gdiFlag_' + j + '_' + i).setStyle('backgroundColor', '#E5ECEF');

            }
        }
    },
    initCalendar2: function () {
        console.log('initCalendar2');
        
        var anio = Ext.getCmp(prototype.id + '-cmbYear').getValue();
        var dias = ["7", "1", "2", "3", "4", "5", "6"];
        var mes;
        var dt2;
        var init, totalDays, fin, day;
        var colorFlag;

        for (var m = 1; m <= 12; m++) {
//            console.log('mex: ' + m );
            var panelmes = Ext.getCmp(prototype.id +'panel'+ (m < 10 ? '0' : '') + m);
            panelmes.removeAll(true);
        }
        console.log('comienza cracion');
        for (var i = 1; i <= 12; i++) {
            if (i < 10) {
                mes = '0' + i;
            } else {
                mes = '' + i + '';
            }
            dt2 = new Date(mes + ' 01' + ', ' + anio + ' 12:00:00');
            totalDays = new Date(anio, mes, 0).getDate();
            init = dias[dt2.getUTCDay()];
            fin = parseInt(totalDays) + parseInt(init);
            day = 1;
            
            var panelmes = Ext.getCmp(prototype.id +'panel'+ (i < 10 ? '0' : '') + i);
            panelmes.suspendLayout = true;
            for (var n = init; n < fin; n++) {
//                if (n % 7 === 1) {
//                    colorFlag = '#D6D6D6';
//                } else {
//                    if (i % 2 !== 0) {
//                        colorFlag = '#65C3E5';
//                    } else {
//                        colorFlag = '#2e6bf4';
//                    }
//                }
//                Ext.getCmp(prototype.id + '-lblDay_' + i + '_' + (parseInt(n))).setText(day);
//                Ext.getCmp(prototype.id + '-lblDay_' + i + '_' + (parseInt(n))).setStyle('backgroundColor', '#ffffff');
//                Ext.getCmp(prototype.id + '-lblDay_' + i + '_' + (parseInt(n))).setStyle('color', '#000000');
//                Ext.getCmp(prototype.id + 'gdiFlag_' + i + '_' + (parseInt(n))).setStyle('backgroundColor', colorFlag);
                
                    
                    
                    if(n === init){
                        for (var c = 1; c < init; c++) {
                            var v_label2 = new Ext.form.Label({text: '',backgroundColor:'#D6D6D6'});
                            panelmes.add( v_label2);
                        }
                        
                    }
                    
                    var fday = (day < 10 ? '0' : '') + day;
                    var v_id = 'lbl'+anio+''+mes+''+ fday ;
                    var v_label = new Ext.form.Label({
                                        id:v_id , text: day,backgroundColor:'#ffffff',color:'#000000',backgroundColor:colorFlag
                                    });
                    panelmes.add( v_label);
                
//                    console.log('mex: ' + i + ' dia : ' + n);
                day++;
            }
        }
        console.log('termina cracion-----------****');
        Ext.getCmp(prototype.id +'panel05').suspendLayout = false;
        Ext.getCmp(prototype.id +'panel05').updateLayout();
    },
    
    setCalendar2: function () {
//        console.log("setCalendar2");
        
//        this.initCalendar2();

        var aux = true;
        me.beanCalendar = {};
        me.beanCalendar.IN_FUENTE = Ext.getCmp(prototype.id + '-cmbFUENTE').getValue();
        me.beanCalendar.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbYear').getValue();
        var beanString = JSON.stringify(me.beanCalendar);
        
        Ext.getCmp(prototype.id + '-lbl-year').setText(me.beanCalendar.IN_FECHA_FROM);

        Ext.Ajax.request({
            url: prototype.url + '/searchCalendar',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                if (aux) {
//                    me.setClearCalendar();
                    me.initCalendar2();
                    var res = Ext.JSON.decode(response.responseText);
                    res = res.data;
                    var dato = 0;
                    var dias = ["7", "1", "2", "3", "4", "5", "6"];
                    var colorFlag;
                    var dia, mes, anio, mesf;
                    
                    for (var i = 0; i < res.length; i++) {
                        dia = res[i].fecha.substring(6, 8);
                        mes = res[i].fecha.substring(4, 6);
                        anio = res[i].fecha.substring(0, 4);
                        mesf = (new Date(mes + ' ' + dia + ', ' + anio + ' 12:00:00').getMonth() + 1).toString();

                        var dt = new Date(mes + ' ' + dia + ', ' + anio + ' 12:00:00');
                        var color = '';
                        //var color = res[i].strFormatDate === 'ROJO' ? '#ff0000' : '#00ff00';
                        
                        
                        if (dt.getDay() === 0 || dt.getDay() === 6) {   // Domingo y Sabado
                            if(me.beanCalendar.IN_FUENTE === 'AXPLUSGR-D' || me.beanCalendar.IN_FUENTE === 'AXLIGATB-D'){
                                color = res[i].strFormatDate === 'AMBAR' ? '#ff4d00' : '#00ff00';
                            }else{
                                color = '#FFFFFF'
                            }
                        } else if(res[i].strFormatDate === 'YELLOW' ){
                            color = '#D8FF02'
                        } else{
                            color = res[i].strFormatDate === 'AMBAR' ? '#ff4d00' : '#00ff00';
                        }
                        

                        if (mesf % 2 !== 0) {
                            colorFlag = '#65C3E5';
                        } else {
                            colorFlag = '#2e6bf4';
                            //colorFlag = '#ffffff';
                        }
                        
//                        console.log('fecha : ' + res[i].fecha + ' date: ' + dt +  ' getUTC : ' + dias[dt.getUTCDay()] );
                        
                        Ext.getCmp('lbl' + res[i].fecha).setStyle('backgroundColor', color);
                        Ext.getCmp('lbl' + res[i].fecha).setStyle('color', '#000000');
                        
//                        if (dia === '01') {
//                            dato = dias[dt.getUTCDay()];
//
//                            Ext.getCmp(prototype.id + '-lblDay_' + mesf + '_' + dato).setText(dia);
//                            Ext.getCmp(prototype.id + '-lblDay_' + mesf + '_' + dato).setStyle('backgroundColor', color);
//                            Ext.getCmp(prototype.id + '-lblDay_' + mesf + '_' + dato).setStyle('color', '#000000');
//                            Ext.getCmp(prototype.id + 'gdiFlag_' + mesf + '_' + dato).setStyle('backgroundColor', colorFlag);
//
//                        } else
//                        {
//                            Ext.getCmp(prototype.id + '-lblDay_' + mesf + '_' + (parseInt(dato) + parseInt(dia) - 1)).setText(dia);
//                            Ext.getCmp(prototype.id + '-lblDay_' + mesf + '_' + (parseInt(dato) + parseInt(dia) - 1)).setStyle('backgroundColor', color);
//                            Ext.getCmp(prototype.id + '-lblDay_' + mesf + '_' + (parseInt(dato) + parseInt(dia) - 1)).setStyle('color', '#000000');
//                            Ext.getCmp(prototype.id + 'gdiFlag_' + mesf + '_' + (parseInt(dato) + parseInt(dia) - 1)).setStyle('backgroundColor', colorFlag);
//
//                        }

                    }
                    aux = false;
                }
                Ext.getBody().unmask();
            }
        });
//        console.log("Salimos de SetCalendar");

    },
    
    searchDelivery_clickHandler: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        var beanDeliv = rowData.data;
        beanDeliv.IN_FECRFILE = rowData.data.strFormatDate.replaceAll('-','');
        switch (columnNum) {
            case 1:
                beanDeliv.IN_ERROR = '';
                break;
            case 9:
                beanDeliv.IN_ERROR = '1';
                break;
        }
        Fuente = beanDeliv.FUENTE;
        if (beanDeliv.IN_ERROR === '1' && beanDeliv.QRECERR === 0) {
            global.Msg({msg: 'Data not found.'});
        } else {
            me.paramsDetail.beanString = JSON.stringify(beanDeliv);
            me.paramsDetail.consulta = '1';
            this.searchDelivery();
        }
        console.log(beanDeliv);
    },
    searchDelivery: function () {
        me.setWidthPie();
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDelivery';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDelivery'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        var beanD = obj.data.items[0].data;
                        win.lblUser_toolTip("Estructura: " + beanD.strFormatDate4);
                        var fuente = Fuente + " Information";
                        Ext.getCmp(prototype.id + '-txtFuente').setText(fuente);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMainData_2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);

    },
    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },

    btn_ChangechkCITY: function (obj, value) {
        if (value) {
            Ext.getCmp(prototype.id + '-txtDateField').show();
            Ext.getCmp(prototype.id + '-cmbCountry').show();
            this.setGridDataCity();
//            this.bean30Source.SOURCOD = Ext.getCmp(prototype.id+'-cmbSource').getValue();
//            this.searchSource(this.bean30Source, this.peek());
        } else {
            Ext.getCmp(prototype.id + '-txtDateField').hide();
            Ext.getCmp(prototype.id + '-cmbCountry').hide();
            this.btnSearch_click();
//            this.btnClear_click();
//            this.search_Filtro(this.bean);
//            this.search(this.bean, this.peek());
        }
    },

    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            //me.setWidthPie();

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
        Ext.getCmp(prototype.id + '-cmbVISTA').setValue('D');
        Ext.getCmp(prototype.id + '-cmbFUENTE').setValue('ACCB');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

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

        switch (me.panelActual) {
            case  '-boxMainAll':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            case  '-boxDelivery':
                global.getFile(prototype.url + '/getXLSX_Delivery?beanString=' + me.paramsDetail.beanString);
                break;
        }

    },
    onDownloadFile: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function (response, options) {
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
    btnFilter_click: function (obj) {

//        var option = Ext.getCmp(prototype.id + '-contentFilter');
        var option = Ext.getCmp(prototype.id + '-Filters3_1');
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
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-boxMainAll':
                me.pagginActual = '-paggin';
                break;
            case '-boxDelivery':
                me.pagginActual = '-paggin2';
                break;
//            case '-boxLogA2270':
//                me.pagginActual = '-paggin3';
//                break;
//            case '-boxDataCity':
//                me.pagginActual = '-paggin4';
//                break;
        }
    },

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
    },
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    }
}
);