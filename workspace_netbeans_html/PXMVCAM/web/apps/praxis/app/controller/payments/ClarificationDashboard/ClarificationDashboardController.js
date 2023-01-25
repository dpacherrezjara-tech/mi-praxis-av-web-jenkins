/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.ClarificationDashboard.ClarificationDashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ClarificationDashboardController',
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
        prototype.id = 'ClarificationDashboardForm';
        prototype.url = CONTEXTPATH + '/ClarificationDashboard';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#ClarificationDashboardForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ClarificationDashboardForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ClarificationDashboardForm-btnClear': {
                click: this.btnClear_click
            },
            '#ClarificationDashboardForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ClarificationDashboardForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ClarificationDashboardForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#ClarificationDashboardForm-btnBack': {
                click: this.btnBack_click
            }
//            '#ClarificationDashboardForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
//                select: this.selectComboFromYear
//            },
//            '#ClarificationDashboardForm-cmbDateToYear': {
//                afterrender: this.afterRenderYear
//            },
//            '#ClarificationDashboardForm-cmbDateFromMonth': {
//                afterrender: this.afterRenderMonth,
//                select: this.selectComboFromMonth
//            },
//            '#ClarificationDashboardForm-cmbDateToMonth': {
//                afterrender: this.afterRenderMonth,
//                select: this.selectComboToMonth
//            }
//            '#ClarificationDashboardForm-cmbDateFromDay': {
//                select: this.selectComboFromDay
//            }

        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
//            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    
    cbxDateFromYear_changeHandler: function() {
        Ext.getCmp(prototype.id+'-cmbDateToYear').setValue(Ext.getCmp(prototype.id+'-cmbDateFromYear').getValue());
    },
    cbxDateFromMonth_changeHandler: function() {
        Ext.getCmp(prototype.id+'-cmbDateToMonth').setValue(Ext.getCmp(prototype.id+'-cmbDateFromMonth').getValue());
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


        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["SENTDATE", "Reception Date"], 
                ["SALEDATE", "Sale Date"]
            ]
        }));
        cmbFecFiltro.setValue("SENTDATE");

        me.btnSearch_click();

    },

    setFormatParameter: function () {
        me.bean = {};

        me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + 
                                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();

        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                              Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        
        var op = Ext.getCmp(prototype.id + '-rbgTDOC').getValue();
        var op2 = Ext.getCmp(prototype.id + '-rbgType').getValue();
        
        me.bean.IN_TDOC = op.rbgTDOC;
        me.bean.IN_SELECT = op2.rbgType;

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };   
//        console.log(searchParams);
    },

    btnSearch_click: function (obj, e) {
        this.setGridData();
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    setGridData: function () {
        this.setFormatParameter();
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
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                        win.lblUser_toolTip("Estructura: A2342/A2343");
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;                            
                            if (data.IN_SELECT === "MONTH") {
                                me.panelActual = '-panelGridData';
                                global.selectedChild(me.childs, prototype.id + me.panelActual);
                                
                                var IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
                                
                                var titIN_DATE ='';
                                if(IN_DATE === 'SALEDATE'){
                                      titIN_DATE = 'Sales';
                                } else{
                                      titIN_DATE = 'Reception';
                                }
                                                                
                                Ext.getCmp(prototype.id + '-adgTitFecha').setText(titIN_DATE);
                                
                                Ext.getCmp(prototype.id + '-lblTotAMTSALE').setText(Ext.util.Format.number(data.dblTotAMTSALE, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARS').setText(Ext.util.Format.number(data.lngTotQTYCLARS, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARP').setText(Ext.util.Format.number(data.lngTotQTYCLARP, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARC').setText(Ext.util.Format.number(data.lngTotQTYCLARC, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQNMATCH').setText(Ext.util.Format.number(data.lngTotQNMATCH, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLAR').setText(Ext.util.Format.number(data.lngTotQTYCLAR, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotAMTCLAR').setText(Ext.util.Format.number(data.dblTotAMTCLARU, '0,000'));
                                
                                Ext.getCmp(prototype.id + '-lblTotAMTREVCU').setText(Ext.util.Format.number(data.totAMTREVCU, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARR').setText(Ext.util.Format.number(data.totQTYCLARR, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotAMTCHGBU').setText(Ext.util.Format.number(data.totAMTCHGBU, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCHGBK').setText(Ext.util.Format.number(data.totQTYCHGBK, '0,000'));
//                                Ext.getCmp(prototype.id + '-lblTotQTYBANK').setText(Ext.util.Format.number(data.lngTotQTYBANK, '0,000'));
//                                Ext.getCmp(prototype.id + '-lblTotQTYBANKN').setText(Ext.util.Format.number(data.lngTotQTYBANKN, '0,000'));
//                                Ext.getCmp(prototype.id + '-lblTotAMTBANK').setText(Ext.util.Format.number(data.dblTotAMTBANK, '0,000'));
                                
                            } else {
                                me.panelActual = '-boxGroupData';
                                global.selectedChild(me.childs, prototype.id + me.panelActual);
                                
                                var titIN_SELECT ='';
                                if(data.IN_SELECT === 'CODEBANK'){
                                      titIN_SELECT = 'Bank';
                                } else{
                                      titIN_SELECT = 'Credit Card';
                                }
                                
                                Ext.getCmp(prototype.id + '-adgTitGroup').setText(titIN_SELECT);
                                Ext.getCmp(prototype.id + '-lblTotAMTSALE_G').setText(Ext.util.Format.number(data.dblTotAMTSALE, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARS_G').setText(Ext.util.Format.number(data.lngTotQTYCLARS, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARP_G').setText(Ext.util.Format.number(data.lngTotQTYCLARP, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLARC_G').setText(Ext.util.Format.number(data.lngTotQTYCLARC, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQNMATCH_G').setText(Ext.util.Format.number(data.lngTotQNMATCH, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYCLAR_G').setText(Ext.util.Format.number(data.lngTotQTYCLAR, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotAMTCLAR_G').setText(Ext.util.Format.number(data.dblTotAMTCLARU, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYBANK_G').setText(Ext.util.Format.number(data.lngTotQTYBANK, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotQTYBANKN_G').setText(Ext.util.Format.number(data.lngTotQTYBANKN, '0,000'));
                                Ext.getCmp(prototype.id + '-lblTotAMTBANK_G').setText(Ext.util.Format.number(data.dblTotAMTBANKU, '0,000'));
                            }
                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-gridDetGroupData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-grafico01').bindStore(storeGridDatas);
        }
    },

    OnviewDetBank: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetailBank';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.SetOnviewDetBank();
    },

    SetOnviewDetBank: function () {
        win.lblUser_toolTip("Estructura: A2342");
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/detailByBank'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = me.paramsDetail;
                    },

                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                            
                            var IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
                            var titIN_DATE ='';
                            
                            if(IN_DATE === 'SALEDATE'){
                                  Ext.getCmp(prototype.id + '-gridDetailBank').setTitle('<center style="font-size:12px;">Sales Date : ' + data.strFormatDate + '</center>');
                            } else{
                                  Ext.getCmp(prototype.id + '-gridDetailBank').setTitle('<center style="font-size:12px;">Reception Date : ' + data.strFormatDate + '</center>');
                            }

                            Ext.getCmp(prototype.id + '-lblTotDB_AMTSALE').setText(Ext.util.Format.number(data.dblTotAMTSALE, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotDB_QTYCLARS').setText(Ext.util.Format.number(data.lngTotQTYCLARS, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotDB_QTYCLARP').setText(Ext.util.Format.number(data.lngTotQTYCLARP, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotDB_QTYCLARC').setText(Ext.util.Format.number(data.lngTotQTYCLARC, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotDB_QNMATCH').setText(Ext.util.Format.number(data.lngTotQNMATCH, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotDB_QTYCLAR').setText(Ext.util.Format.number(data.lngTotQTYCLAR, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotDB_AMTCLAR').setText(Ext.util.Format.number(data.dblTotAMTCLARU, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotDB_QTYBANK').setText(Ext.util.Format.number(data.lngTotQTYBANK, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotDB_QTYBANKN').setText(Ext.util.Format.number(data.lngTotQTYBANKN, '0,000'));
                            Ext.getCmp(prototype.id + '-lblTotDB_AMTBANK').setText(Ext.util.Format.number(data.dblTotAMTBANKU, '0,000'));
                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDetailBank').bindStore(storeGridDatas);
        }
    },
    
    cmbTDOC_changeHandler: function () {
        this.btnSearch_click();
    },
    
    cmbTranType_changeHandler: function () {
        this.btnSearch_click();
    },

    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
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

        Ext.create('Ext.Praxis.view.payments.ClarificationDashboardForm.DataEntry', {
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
//            me.setWidthPie();
//            this.getPaggin();
//            if (me.pagginActual !== '') {
//                var pag = Ext.getCmp(prototype.id + me.pagginActual);
//                var pagData = pag.getPageData();
//                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//            }
        } else {
            global.showMenu();
        }
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('01');
//        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('01');
//        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');

    },
    btnExcel_click: function (obj, e) {

//        this.setFormatParameter();
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
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            case  '-boxGroupData':
                global.getFile(prototype.url + '/getXLSX_2?beanString=' + searchParams.beanString);
                break;
            case  '-boxDetailBank':
                global.getFile(prototype.url + '/getXLSX_Bank?beanString=' + me.paramsDetail.beanString);
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
            case '-boxDetDay':
                me.pagginActual = '-paggin2';
                break;
            case '-boxDetCardNbr':
                me.pagginActual = '-paggin3';
                break;
            case '-boxDetMerchant':
                me.pagginActual = '-paggin4';
                break;
            case '-boxDetBankByS':
                me.pagginActual = '-paggin5';
                break;
            case '-boxDetDayByS':
                me.pagginActual = '-paggin6';
                break;
            case '-boxDetMerchantByS':
                me.pagginActual = '-paggin7';
                break;
//            case '-boxByMerchant':
//                me.pagginActual = '-paggin8';
//                break;
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
    
    displayChart_ByMonth: function(cmp, value) {
                
        var rbCla = value.rbCla;
//        console.log(rbCla);
        
        
        var chart = Ext.getCmp(prototype.id + '-grafico01');
//        console.log(chart);
        console.log(chart.axes);
        console.log(chart.axes[0]._fields[0]);
        chart.axes[0].setFields(['dblAMTBANK']);
//        chart.axes[1].setFields(['dblAMTBANK']);
        console.log(chart.axes[0]._fields[0]);
//        console.log(chart.axes[0].fields);
//        console.log(chart.series.items[0].yField);
        
//        chart.axes.get('bottom').fields = [AMTREVCU];
        
//        this.getSerachList(false);
    },
    /*     
     * Funciones para la paginacion     
     */

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