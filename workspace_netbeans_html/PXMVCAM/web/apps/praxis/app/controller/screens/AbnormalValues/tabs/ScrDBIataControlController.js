Ext.define('Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrDBIataControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrDBIataControlController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    searchParams_chart: {},
    columns2: {},
    bean: {},
    beanDet: {},
    meIataCtr: '',
    meIataCtr_chart: '',
    colors_WK: [
        '#33bdda',
        '#FAB347',
        '#6baa01',
        '#c6f7cd',
        '#828CE1',
        '#CC0000',
        '#0066ff'
    ],
    beanChart: {},
    dw_excel: false,
    boxActual: '-boxMainDataIataControl',
    drillDown: [],
    gloMoneda: 'USD',
    beanProMasterTicket: {},
    _path: '',
    // </editor-fold>
    init: function (view) {
        meIataCtr = this;
        meIataCtr.drillDown.push(meIataCtr.boxActual);
//        console.log(meIataCtr.drillDown);


        var type = Ext.getCmp(prototype.id + '-cmbTipo_ControlTotal');
        type.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Values out of Range"],
                ["2", "Average Control"],
                ["3", "Total Control"]
            ]
        }));
        type.setValue("1");
    },
    afterRender: function () {

        Ext.getCmp(prototype.id + '-cmbDateFromYear2').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear2').setValue(new Date().getFullYear());

        Ext.getCmp(prototype.id + '-cmbDateFromMonth2').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth2').setValue('');

        Ext.getCmp(prototype.id + '-cmbDateFromDay2').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay2').setValue('');

    },
    btnSearch_click: function (bean) {
        
        Ext.getCmp(prototype.id + '-boxMainDataIataValuesOutOfRange').show();
        Ext.getCmp(prototype.id + '-BoxTKT_CT').hide();
        Ext.getCmp(prototype.id + '-boxMainDataIataAverageControl').hide();
        Ext.getCmp(prototype.id + '-BoxControlTotal').hide();
        Ext.getCmp(prototype.id + '-radioButton').show();

        var selectBy = Ext.getCmp(prototype.id + '-cmbTipo_ControlTotal').getValue();
        var chk = Ext.getCmp(prototype.id + '-chkONE').getValue();
        if (selectBy === '1') {
            Ext.getCmp(prototype.id + '-chkMonth_label').show();
            Ext.getCmp(prototype.id + '-chkONE').show();
            if (chk) {
                Ext.getCmp(prototype.id + '-chkMonth_label').setText('One Columns View');
                this.DD_BYAGENT_colHandler('XXX');
                Ext.getCmp(prototype.id + '-radioButton').show();
            } else {
                Ext.getCmp(prototype.id + '-chkMonth_label').setText('Three Columns View');
                this.loadTotalControlTotal_Abnormal_Country_ONE();
                Ext.getCmp(prototype.id + '-radioButton').hide();
            }
        } else if (selectBy == '2') {
            Ext.getCmp(prototype.id + '-chkMonth_label').hide();
            Ext.getCmp(prototype.id + '-chkONE').hide();
            Ext.getCmp(prototype.id + '-radioButton').hide();
            Ext.getCmp(prototype.id + '-boxMainDataIataValuesOutOfRange').hide();
            Ext.getCmp(prototype.id + '-BoxControlTotal').hide();
            Ext.getCmp(prototype.id + '-boxMainDataIataAverageControl').show();
            this.loadTotalControlTotal_Agent();

        } else if (selectBy == '3') {
            Ext.getCmp(prototype.id + '-chkMonth_label').hide();
            Ext.getCmp(prototype.id + '-chkONE').hide();
            Ext.getCmp(prototype.id + '-radioButton').hide();
            Ext.getCmp(prototype.id + '-boxMainDataIataValuesOutOfRange').hide();
            Ext.getCmp(prototype.id + '-boxMainDataIataAverageControl').hide();
            Ext.getCmp(prototype.id + '-BoxControlTotal').show();
            this.loadTotalControlTotal_Tran();
        }
    },
    loadTotalControlTotal_Abnormal_Country_ONE: function () {
        Ext.getCmp(prototype.id + '-BoxAB_Agent').hide();
        console.log(' ScrDBIataControlController - loadTotalControlTotal_Abnormal_Country_ONE');

        this.setFormatParameter();
        win.lblUser_toolTip("Estructura: IMF078");
        Ext.Ajax.request({
            url: prototype.url + '/loadTotalControlTotal_Abnormal_Country_ONE',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: this.searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');

                var res = Ext.JSON.decode(response.responseText);
                var lstData = res.lstData_Abnormal_CS;
//                console.log(lstData);

                if (lstData.length > 0) {
//                    var bean = lstData[0];
//                    Ext.getCmp(prototype.id + '-chkMonth_label').setText('One Columns View');

                    var storeData = Ext.create('Ext.data.Store', {
                        data: lstData,
                        autoLoad: true
                    });

                    Ext.getCmp(prototype.id + '-gridMainDataByValues').bindStore(storeData);                    
                } else {
                    global.Msg({msg: 'Data not found.'});
                }
            }
        });

//        meIataCtr.dw_excel = false;

    },
    loadTotalControlTotal_Abnormal: function () {

        console.log(' ScrDBIataControlController - loadTotalControlTotal_Abnormal');

        this.setFormatParameter_2();
        win.lblUser_toolTip("Estructura: IMF078");
        Ext.Ajax.request({
            url: prototype.url + '/loadTotalControlTotal_Abnormal',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: this.searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');

                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                var lstData = res.lstData_Abnormal_S;
                var lstData2 = res.lstData_Abnormal_R;
                var lstData3 = res.lstData_Abnormal_E;
//
                if (lstData.length > 0) { // if (lstData.length > 0 && lstData2.length > 0) {
                    var bean = lstData[0];
                    if (lstData2.length > 0) {
                        var bean2 = lstData2[0];
                        Ext.getCmp(prototype.id + '-titFechaR_AB').setText(bean2.strDescripcion4);
                    }
                    
                    if (lstData3.length > 0) {
                        var bean3 = lstData3[0];
                        Ext.getCmp(prototype.id + '-titFechaE_AB').setText(bean3.strDescripcion4);
                    }
                    
                    
//
                    Ext.getCmp(prototype.id + '-titSales_AB_A').setText('Sales USD');
                    Ext.getCmp(prototype.id + '-titRefund_AB_A').setText('Refund USD');
                    Ext.getCmp(prototype.id + '-titExchange_AB_A').setText('Exchange USD');
//
                    Ext.getCmp(prototype.id + '-titFechaS_AB').setText(bean.strDescripcion4);                                        
//
                    var storeData = Ext.create('Ext.data.Store', {
                        data: lstData,
                        autoLoad: true
                    });

                    var storeData2 = Ext.create('Ext.data.Store', {
                        data: lstData2,
                        autoLoad: true
                    });

                    var storeData3 = Ext.create('Ext.data.Store', {
                        data: lstData3,
                        autoLoad: true
                    });
//
                    Ext.getCmp(prototype.id + '-grid_BoxSale').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-grid_BoxRefund').bindStore(storeData2);
                    Ext.getCmp(prototype.id + '-grid_BoxExchange').bindStore(storeData3);
                } else {
                    global.Msg({msg: 'Data not found.'});
                }
            }
        });

//        meIataCtr.dw_excel = false;

    },
    ViewAgent: function (grid, rowIndex, colIndex, c, d, e, f, g) {

        var beanDetail = grid.getStore().getAt(rowIndex).data;
        meIataCtr.beanChart = grid.getStore().getAt(rowIndex).data;


        meIataCtr.beanChart.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear2').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth2').getValue();
        meIataCtr.beanChart.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear2').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth2').getValue();
        meIataCtr.beanChart.VENDOR = beanDetail.AIRLINE;
        meIataCtr.beanChart.strDescription = beanDetail.strFlag;
        meIataCtr.beanChart.FTE = 'EXCH';

        var beanString = JSON.stringify(meIataCtr.beanChart);
        this.searchParams_chart = beanString;

//        this.loadControlAgentChart();

    },
    loadControlAgentChart: function () {

        win.lblUser_toolTip("Estructura: IMF078");

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadControlAgentChart'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getBody().mask('Loading...');
                    obj.proxy.extraParams = {beanString: meIataCtr.searchParams_chart, dw_excel: false};
                },
                load: function (obj) {
                    Ext.getBody().unmask('Loading...');
                    console.log(obj);

                    if (obj.data.length === 0) {
//                        global.Msg({msg: 'Data not found.'});
                    } else {
                        console.log(obj.data);
//
                    }
                }
            }
        });

//        Ext.getCmp(prototype.id + '-displayChartByAgent01_XXX').bindStore(storeGridDatas);


//        Ext.Ajax.request({
//            url: prototype.url + '/loadControlAgentChart',
//            method: 'POST',
//            timeout: 60000000,
//            beforerequest: Ext.getBody().mask('Loading...'),
//            params: {beanString: this.searchParams_chart, dw_excel: false},
//            success: function (response, options) {
//                Ext.getBody().unmask('Loading...');
//
//                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
//                var lstData = res.lstAgentChart;
//
//                if (lstData.length > 0) {
////                    console.log(lstData);
////                    
//                    var storeData = Ext.create('Ext.data.Store', {
//                        data: lstData,
//                        autoLoad: true
//                    });
//////
//                    Ext.getCmp(prototype.id + '-displayChartByAgent01').bindStore(storeData);
//                } else {
//                    global.Msg({msg: 'Data not found.'});
//                }
//            }
//        });


    },
    loadTotalControlTotal_Abnormal_Country: function () {

        console.log(' ScrDBIataControlController - loadTotalControlTotal_Abnormal_Country');

        this.setFormatParameter_2();
        win.lblUser_toolTip("Estructura: IMF078");
        Ext.Ajax.request({
            url: prototype.url + '/loadTotalControlTotal_Abnormal_Country',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: this.searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');

                var res = Ext.JSON.decode(response.responseText);
                var lstData = res.lstData_Abnormal_CS;
                var lstData2 = res.lstData_Abnormal_CR;
                var lstData3 = res.lstData_Abnormal_CE;

                if (lstData.length > 0) {
                    var bean = lstData[0];
                    var bean2 = lstData2[0];
                    var bean3 = lstData3[0];

                    Ext.getCmp(prototype.id + '-titSales_AB').setText('Sales USD');
                    Ext.getCmp(prototype.id + '-titRefund_AB').setText('Refund USD');
                    Ext.getCmp(prototype.id + '-titExchange_AB').setText('Exchange USD');

                    Ext.getCmp(prototype.id + '-titFecha_AB_Country_S').setText(bean.strDescripcion4);
                    Ext.getCmp(prototype.id + '-titFecha_AB_Country_R').setText(bean2.strDescripcion4);
                    Ext.getCmp(prototype.id + '-titFecha_AB_Country_E').setText(bean3.strDescripcion4);

                    var storeData = Ext.create('Ext.data.Store', {
                        data: lstData,
                        autoLoad: true
                    });

                    var storeData2 = Ext.create('Ext.data.Store', {
                        data: lstData2,
                        autoLoad: true
                    });

                    var storeData3 = Ext.create('Ext.data.Store', {
                        data: lstData3,
                        autoLoad: true
                    });

                    Ext.getCmp(prototype.id + '-ADG_GridControlTotal_Abnormal_CS').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-ADG_GridControlTotal_Abnormal_CR').bindStore(storeData2);
                    Ext.getCmp(prototype.id + '-ADG_GridControlTotal_Abnormal_CE').bindStore(storeData3);
                } else {
                    global.Msg({msg: 'Data not found.'});
                }
            }
        });

//        meIataCtr.dw_excel = false;

    },
    setFormatParameter: function () {
        meIataCtr.bean = {};

        meIataCtr.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear2').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth2').getValue();
        meIataCtr.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear2').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth2').getValue();
        meIataCtr.bean.IN_PAIS = Ext.getCmp(prototype.id + '-cmbPais').getValue();
        meIataCtr.bean.strTIPO = Ext.getCmp(prototype.id + '-cmbTran').getValue();
        meIataCtr.bean.FLAG = '';
        meIataCtr.bean.IN_CARD1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        meIataCtr.bean.IN_CARD2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();

        var beanString = JSON.stringify(meIataCtr.bean);
        this.searchParams = beanString;
    },
    setFormatParameter_2: function () {
        meIataCtr.bean = {};

        meIataCtr.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear2').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth2').getValue();
        meIataCtr.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear2').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth2').getValue();
        meIataCtr.bean.IN_PAIS = '';
        meIataCtr.bean.strCountryS = '';
        meIataCtr.bean.strTIPO = Ext.getCmp(prototype.id + '-cmbTran').getValue();
        meIataCtr.bean.FLAG = '';
        meIataCtr.bean.IN_CARD1 = Ext.getCmp(prototype.id + '-txtCard1').getValue();
        meIataCtr.bean.IN_CARD2 = Ext.getCmp(prototype.id + '-txtCard2').getValue();

        var beanString = JSON.stringify(meIataCtr.bean);
        this.searchParams = beanString;
    },
    ChangechkONE: function (obj, value, cmp, strFunc) {
        Ext.getCmp(prototype.id + '-BoxTKT_CT').hide();
        if (value) {
            Ext.getCmp(prototype.id + '-BoxAB_Pais_ONE').hide();
            Ext.getCmp(prototype.id + '-BoxAB_Pais').show();
            Ext.getCmp(prototype.id + '-radioButton').show();

            Ext.getCmp(prototype.id + '-chkMonth_label').setText('One Columns View');

            this.btnSearch_click();
        } else {
            Ext.getCmp(prototype.id + '-BoxAB_Pais').hide();            
            Ext.getCmp(prototype.id + '-radioButton').hide();
            Ext.getCmp(prototype.id + '-BoxAB_Pais_ONE').show();

            Ext.getCmp(prototype.id + '-chkMonth_label').setText('Three Columns View');

            this.loadTotalControlTotal_Abnormal_Country_ONE()
        }

    },
    DD_BYAGENT_colHandler: function (obj, rb_new, rb_old, func) {
        Ext.getCmp(prototype.id + '-BoxTKT_CT').hide();
        Ext.getCmp(prototype.id + '-panelGraficos').hide();
        Ext.getCmp(prototype.id + '-panel_titulo').hide();
        if (obj !== 'XXX') {

        } else {
            var tipo_radio = Ext.getCmp(prototype.id + '-rbgType').getValue().rbgType;
            if (tipo_radio === '2') {   // Agent
//                Ext.getCmp(prototype.id + '-panelGraficos').show();
                Ext.getCmp(prototype.id + '-BoxAB_Pais').hide();
                Ext.getCmp(prototype.id + '-BoxAB_Agent').show();
                this.loadTotalControlTotal_Abnormal();
            } else {    // Country
                Ext.getCmp(prototype.id + '-panelGraficos').hide();
                Ext.getCmp(prototype.id + '-panel_titulo').hide();
                Ext.getCmp(prototype.id + '-BoxAB_Pais').show();
                Ext.getCmp(prototype.id + '-BoxAB_Agent').hide();
                this.loadTotalControlTotal_Abnormal_Country();
            }
        }
    },
    loadTotalControlTotal_Agent: function () {

        console.log(' ScrDBIataControlController - loadTotalControlTotal_Agent');

        //meIataCtr.boxActual = 'boxMainDataIataAverageControl';
        //meIataCtr.drillDown.push(meIataCtr.boxActual);        

        this.setFormatParameter();
        win.lblUser_toolTip("Estructura: IMF078");
        Ext.Ajax.request({
            url: prototype.url + '/loadTotalControlTotal_Agent',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: this.searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                console.log(response);

                var res = Ext.JSON.decode(response.responseText);
                console.log('if');
                var lstData = res.lstData;
                //console.log(lstData);                
                if (lstData.length > 0) {
                    var bean = lstData[0];
                    Ext.getCmp(prototype.id + '-titFecha6_AG').setText(bean.strDescripcion4);

                    Ext.getCmp(prototype.id + '-titFecha6_AG_2').setText(bean.strDescripcion4);
                    Ext.getCmp(prototype.id + '-titFecha5_AG').setText(bean.strDescripcion3);
                    Ext.getCmp(prototype.id + '-titFecha4_AG').setText(bean.strDescripcion2);
                    Ext.getCmp(prototype.id + '-titFecha3_AG').setText(bean.strDescripcion1);
                    Ext.getCmp(prototype.id + '-titFecha2_AG').setText(bean.strDescripcion);
                    Ext.getCmp(prototype.id + '-titFecha1_AG').setText(bean.strFormatDate4);

                    var storeData = Ext.create('Ext.data.Store', {
                        data: lstData,
                        autoLoad: true
                    });
                    console.log(storeData);
                    Ext.getCmp(prototype.id + '-gridTotal_AG').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-gridTotal_AG_2').bindStore(storeData);
                } else {
                    global.Msg({msg: 'Data not found.'});
                }


            }
        });

//        meIataCtr.dw_excel = false;

    },
    loadTotalControlTotal_Tran: function () {

        console.log(' ScrDBIataControlController - loadTotalControlTotal_Tran');

        this.setFormatParameter();
        win.lblUser_toolTip("Estructura: IMF078");
        Ext.Ajax.request({
            url: prototype.url + '/loadTotalControlTotal_Tran',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: this.searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lstData = res.lstData;

                if (lstData.length > 0) {
                    var bean = lstData[0];

                    Ext.getCmp(prototype.id + '-titFecha6_CT').setText(bean.strDescripcion4);
                    Ext.getCmp(prototype.id + '-titFecha5_CT').setText(bean.strDescripcion3);
                    Ext.getCmp(prototype.id + '-titFecha4_CT').setText(bean.strDescripcion2);
                    Ext.getCmp(prototype.id + '-titFecha3_CT').setText(bean.strDescripcion1);
                    Ext.getCmp(prototype.id + '-titFecha2_CT').setText(bean.strDescripcion);
                    Ext.getCmp(prototype.id + '-titFecha1_CT').setText(bean.strFormatDate4);

                    var storeData = Ext.create('Ext.data.Store', {
                        data: lstData,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridControlTotal').bindStore(storeData);
                } else {
                    global.Msg({msg: 'Data not found.'});
                }
            }
        });
    },
    imgBack_clickHandler: function () {
        if (Ext.getCmp(prototype.id + '-BoxTKT_CT').isVisible) {
            Ext.getCmp(prototype.id + '-BoxTKT_CT').hide();
            Ext.getCmp(prototype.id + '-BoxAB_Agent').show();
        }
    },
    
    onClickViewAgent: function (args, b, c, d, e, f, dataRow, h) {

        console.log(' ScrDBIataControlController - loadTotalControlTotal_TKT');

        var bean = dataRow.data;

        bean.IN_TYPE = args;

        //meIataCtr.boxActual = 'boxMainDataIataAverageControl';
        //meIataCtr.drillDown.push(meIataCtr.boxActual); 

        var beanString = JSON.stringify(bean);
        this.searchParams = beanString;

        win.lblUser_toolTip("Estructura: A720 / A713");
        Ext.Ajax.request({
            url: prototype.url + '/loadTotalControlTotal_TKT',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: this.searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                console.log(response);

                var res = Ext.JSON.decode(response.responseText);
                console.log('if');
                var lstData = res.lstData;
                //console.log(lstData);                
                if (lstData.length > 0) {
                    var bean = lstData[0];
                    Ext.getCmp(prototype.id + '-BoxTKT_CT').show();
                    Ext.getCmp(prototype.id + '-BoxAB_Agent').hide();

                    meIataCtr.drillDown.push(meIataCtr.boxActual);
                    meIataCtr.boxActual = '-BoxTKT_CT';
                    //global.selectedChild(meIataCtr.childs, prototype.id + meIataCtr.panelActual);

                    Ext.getCmp(prototype.id + '-titTKT_Tran').setText(bean.strDescripcion5);
                    Ext.getCmp(prototype.id + '-ADG_GridQuickTkt_CT').setTitle('<center style="font-size:12px;">' + bean.strFormatDate + ' </center>');

                    var storeData = Ext.create('Ext.data.Store', {
                        data: lstData,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-ADG_GridQuickTkt_CT').bindStore(storeData);
                    console.log(storeData);
                } else {
                    global.Msg({msg: 'Data not found.'});
                }


            }
        });

//        meIataCtr.dw_excel = false;

    },
    
    gridData_VIEWTKT_clickHandler: function (column, e, row, column, x, rowData) {

        prototypeProgram.view = 'screens-abnormal-values-form';
        prototypeProgram.nprog = 'PX00000414';
        prototypeProgram.title = 'Warning Values';
        prototypeProgram.modulo = '';

        var data = x.record.data;
        var strTkt = data.strDescripcion;
        this.beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        this.beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        this.beanProMasterTicket.IN_SERIE = strTkt.substr(8, 7);
        this.beanProMasterTicket.IN_SEQ = data.A720SEQ; //00
        console.log(this.beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', this.beanProMasterTicket);
    },    
    ViewAgent: function(grid, rowIndex, colIndex, c,rec,e,f,g) {
        
//        console.log(c.tooltip);
        
        var beanDetail = grid.getStore().getAt(rowIndex).data;
        meIataCtr.beanChart = beanDetail;
        
        meIataCtr.beanChart.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear2').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth2').getValue();
        meIataCtr.beanChart.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear2').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth2').getValue();
        meIataCtr.beanChart.VENDOR = beanDetail.AIRLINE;
        meIataCtr.beanChart.strDescription = beanDetail.strFlag;
        meIataCtr.beanChart.FTE = c.tooltip;
        
        var beanString = JSON.stringify(meIataCtr.beanChart);
        meIataCtr.searchParams_chart = beanString;
        
        
        console.log(meIataCtr.beanChart.VENDOR);
        this.loadControlAgentChart();
        
    },
    loadControlAgentChart: function () {

        console.log('----------------------------loadControlAgentChart');
        
//        Ext.getCmp(prototype.id + '-displaySAChart14').bindStore(Ext.create('Ext.data.Store', {
//            fields: ['data'],
//            autoLoad: true,
//            data: [
//                {"strFormatDate": "202203", "AMOUNT": 200000},
//                {"strFormatDate": "202207", "AMOUNT": 300000},
//                {"strFormatDate": "202208", "AMOUNT": 400000}
//
//            ]
//        }));
        
        win.lblUser_toolTip("Estructura: IMF078");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadControlAgentChart'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getBody().mask('Loading...');
                    obj.proxy.extraParams = {beanString: meIataCtr.searchParams_chart, dw_excel: false};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getBody().unmask('Loading...');
                    var res = Ext.JSON.decode(response._response.responseText);
                    
                    console.log(res);
                    
                    if (res.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else {
                        Ext.getCmp(prototype.id + '-panelGraficos').show();
                        Ext.getCmp(prototype.id + '-panel_titulo').show();
                        console.log(res.data);
                        var lst = res.data;
                        
                        
                        Ext.getCmp(prototype.id + '-lb_barras').setHtml('<strong style="font-size:12px;">' + res.data[0].strDescription + ' (' + res.data[0].VENDOR + ')' + '</strong>');
                        
                        /*
                        Ext.getCmp(prototype.id + '-displaySAChart14').setTitle('Changed Title');
                        var storeDataUso = Ext.create('Ext.data.Store', {
                            fields: ['data'],
                            data: lst,
                            autoLoad: true
                        });
                        
                        Ext.getCmp(prototype.id + '-displaySAChart14').bindStore(storeDataUso);
                        */

                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-displaySAChart14').bindStore(storeGridDatas);

    },    
    onColumnRender: function (sprite, config, data, index) {
        return {
            fillStyle: this.colors_WK[index],
            strokeStyle: index % 2 ? 'none' : 'black',
            opacity: index % 2 ? 1 : 0.5
        };
    },
});
