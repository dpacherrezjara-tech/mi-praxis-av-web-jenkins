/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : ConciliationASR                                   *
 * Created on : 20-09-2016, 17:07:02                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 20-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

/* global Ext, gloContextPath, gloServerDate, gloServerTime, global, win */

Ext.define('PXMVCAMHome.controller.sales.ConciliationASR.ConciliationASR', {
    extend: 'Ext.app.Controller',
    views: [
        'sales.ConciliationASR.ConciliationASRForm'
    ],
    url: gloContextPath + '/ConciliationASR',
    contentPanel: 1300,
    hiddenFilter: true,
    vp_serverDate: gloServerDate,
    vp_serverTime: gloServerTime,
    vp_gridTransactions_rowIndex: -1,
    vp_gridDataByCurrency_rowIndex: -1,
    vp_gridDataPraxisVsInteract_rowIndex: -1,
    init: function () {
        console.log('1) APPLICATION CONCILIATION_ASR - CONTROLLER CONCILIATION_ASR - INIT');
        this.control({
            '#vConciliationASR-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#vConciliationASR-btnSearch': {
                click: this.btnSearch_click
            },
            '#vConciliationASR-btnFilter': {
                click: function(){

                }
            },
            '#vConciliationASR-rg1': {
                change: this.rg1_change
            },
            '#vConciliationASR-cbmFilterType': {
                select: this.cbmFilterType_select
            },
            '#vConciliationASR-txtDateFrom': {
                afterrender: function(obj){
                    
                }
            },
            '#vConciliationASR-tabInfo': {
                tabchange: this.tabInfo_tabchange
            },
            '#vConciliationASR-gridTransactions': {
                select: this.gridTransactions_select
            },
            '#vConciliationASR-DataEntry-center': {
                afterrender: this.DataEntry_center_afterrender
            },
            '#vConciliationASR-DataEntry-lblPRAXIS': {
                render: this.DataEntry_lblPRAXIS_render
            },
            '#vConciliationASR-DataEntry-btnSave': {
                click: this.DataEntry_btnSave_click
            },
            '#vConciliationASR-DataEntry-btnCancel': {
                click: this.DataEntry_btnCancel_click
            },
            '#vConciliationASR-ViewInteract-center': {
                afterrender: this.ViewInteract_center_afterrender
            },
            '#vConciliationASR-ViewInteract-btnClose': {
                click: this.ViewInteract_btnClose_click
            },
            '#vConciliationASR-DataEntryTransaction-center': {
                afterrender: this.DataEntryTransaction_center_afterrender
            },
            '#vConciliationASR-DataEntryTransaction-txtXTST': {
                change: this.DataEntryTransaction_txtXTST_change
            },
            '#vConciliationASR-DataEntryTransaction-txtVOIDS': {
                change: this.DataEntryTransaction_txtVOIDS_change
            },
            '#vConciliationASR-DataEntryTransaction-txtTTRANS': {
                change: this.DataEntryTransaction_txtTTRANS_change
            },
            '#vConciliationASR-DataEntryTransaction-btnUpdate': {
                click: this.DataEntryTransaction_btnUpdate_click
            },
            '#vConciliationASR-DataEntryTransaction-btnClose': {
                click: this.DataEntryTransaction_btnClose_click
            }
        });
    },
    calculateAddDate: function(strDateFrom, days){
        var dateFrom = new Date(strDateFrom.substring(0, 4) + '-' + strDateFrom.substring(4, 6) + '-' + strDateFrom.substring(6, 8));
        dateFrom = this.calculateDate(dateFrom, days);
        return dateFrom.toISOString().substring(0, 10).replace(new RegExp(/-/gi), '/');
    },
    calculateSubDate: function(strDateFrom, days){
        var dateFrom = new Date(strDateFrom.substring(0, 4) + '-' + strDateFrom.substring(4, 6) + '-' + strDateFrom.substring(6, 8));
        dateFrom = this.calculateDate(dateFrom, days * -1);
        return dateFrom.toISOString().substring(0, 10).replace(new RegExp(/-/gi), '/');
    },
    calculateDate: function(fecha, dias){
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    },
    xpanel_afterrender: function(){
        Ext.getCmp('vConciliationASR-rf1').setValue(true);

        var strDate = this.vp_serverDate.substring(0, 4) + '/' + this.vp_serverDate.substring(4, 6) + '/' + this.vp_serverDate.substring(6, 8);
        var strInteractDate = this.calculateSubDate(this.vp_serverDate, 4);

        Ext.getCmp('vConciliationASR-txtDateFrom').setValue(strInteractDate);
        Ext.getCmp('vConciliationASR-txtDateTo').setValue(strInteractDate);

        var combo = Ext.getCmp('vConciliationASR-cmbFilterStatusAmount');
        combo.select('ALL');
        combo.fireEvent('select', combo, combo.getStore().getById('ALL'));

        this.btnSearch_click();
    },
    btnSearch_click: function(obj, e){
        var vFormFilter = Ext.ComponentQuery.query('[id=vConciliationASR-contentFilter] > form')[0];
        if (vFormFilter.isValid()) {
            switch(Ext.getCmp('vConciliationASR-rg1').getValue().opt){
                case 'IP':
                    Ext.getCmp('vConciliationASR-gridTransactions').getStore().removeAll();
                    Ext.getCmp('vConciliationASR-tabInfo').setActiveTab('vConciliationASR-gridTransactions');
                    vFormFilter.getForm().submit({
                        url: this.url + '/loadPXF051',
                        method: 'POST',
        //                waitTitle: 'Processing',
        //                waitMsg: 'Response time...',
                        params: {

                        },
                        success: function (form, action) {
                            var resp = Ext.JSON.decode(action.response.responseText);
                            Ext.getCmp('vConciliationASR-gridTransactions').getStore().loadData(resp.data);
                        },
                        failure: function (form, action) {
                            if (action.failureType === 'server') {
                                obj = Ext.JSON.decode(action.response.responseText);
                                Ext.Msg.alert('Server Error!', obj.msg);
                            } else {
                                Ext.Msg.alert('Warning!', action.response.responseText);
                            }
                        }
                    });
                    break;
                case 'PI':
                    Ext.getCmp('vConciliationASR-gridDataPraxisVsInteract').getStore().removeAll();
                    vFormFilter.getForm().submit({
                        url: this.url + '/loadPX031S03A1530',
                        method: 'POST',
        //                waitTitle: 'Processing',
        //                waitMsg: 'Response time...',
                        params: {

                        },
                        success: function (form, action) {
                            var resp = Ext.JSON.decode(action.response.responseText);
                            Ext.getCmp('vConciliationASR-gridDataPraxisVsInteract').getStore().loadData(resp.data);
                        },
                        failure: function (form, action) {
                            if (action.failureType === 'server') {
                                obj = Ext.JSON.decode(action.response.responseText);
                                Ext.Msg.alert('Server Error!', obj.msg);
                            } else {
                                Ext.Msg.alert('Warning!', action.response.responseText);
                            }
                        }
                    });
                    break;
            }
        } else {
            Ext.Msg.alert('Message', 'Enter the required fields correctly.');
        }
    },
    rg1_change: function (field, newValue, oldValue) {
        var value = newValue.opt;
        if (Ext.isArray(value)) {
            return;
        }
        var combo = Ext.getCmp('vConciliationASR-cbmFilterType');
        var tabInfo = Ext.getCmp('vConciliationASR-tabInfo');
        switch (value) {
            case 'IP':
                combo.bindStore(Ext.create('PXMVCAMHome.store.sales.ConciliationASR.FilterBys01'));
                combo.select('FREPOR');
                combo.fireEvent('select', combo, combo.getStore().getById('FREPOR'));
                
                tabInfo.child('#vConciliationASR-gridTransactions').tab.show();
                tabInfo.child('#vConciliationASR-gridDataByCurrency').tab.show();
                tabInfo.child('#vConciliationASR-gridDataPraxisVsInteract').tab.hide();
                tabInfo.setActiveTab('vConciliationASR-gridTransactions');
                break;
            case 'PI':
                combo.bindStore(Ext.create('PXMVCAMHome.store.sales.ConciliationASR.FilterBys02'));
                combo.select('ALL');
                combo.fireEvent('select', combo, combo.getStore().getById('ALL'));
                
                tabInfo.child('#vConciliationASR-gridTransactions').tab.hide();
                tabInfo.child('#vConciliationASR-gridDataByCurrency').tab.hide();
                tabInfo.child('#vConciliationASR-gridDataPraxisVsInteract').tab.show();
                tabInfo.setActiveTab('vConciliationASR-gridDataPraxisVsInteract');
                break;
        }
    },
    cbmFilterType_select: function (obj, record, eOpts) {
        var code = obj.getValue();
        switch(Ext.getCmp('vConciliationASR-rg1').getValue().opt){
            case 'IP':
                switch(code) {
                    case 'FREPOR':
                        Ext.getCmp('vConciliationASR-txtDateFrom').setVisible(true);
                        Ext.getCmp('vConciliationASR-txtDateTo').setVisible(true);
                        Ext.getCmp('vConciliationASR-cmbFilterStatusAmount').setVisible(true);
                        Ext.getCmp('vConciliationASR-txtProcessingDate01').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtIATACode01').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtOpenDate02').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtIATACode02').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtGroup03').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtIDFile04').setVisible(false);
                        
                        Ext.getCmp('vConciliationASR-txtDateFrom').focus();
                        break;
                }
                break;
            case 'PI':
                switch(code) {
                    case 'ALL':
                        Ext.getCmp('vConciliationASR-txtDateFrom').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtDateTo').setVisible(false);
                        Ext.getCmp('vConciliationASR-cmbFilterStatusAmount').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtProcessingDate01').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtIATACode01').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtOpenDate02').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtIATACode02').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtGroup03').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtIDFile04').setVisible(false);
                        break;
                    case 'FPROCE':
                        Ext.getCmp('vConciliationASR-txtDateFrom').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtDateTo').setVisible(false);
                        Ext.getCmp('vConciliationASR-cmbFilterStatusAmount').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtProcessingDate01').setVisible(true);
                        Ext.getCmp('vConciliationASR-txtIATACode01').setVisible(true);
                        Ext.getCmp('vConciliationASR-txtOpenDate02').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtIATACode02').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtGroup03').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtIDFile04').setVisible(false);
                        
                        Ext.getCmp('vConciliationASR-txtProcessingDate01').focus();
                        break;
                    case 'FREPOR':
                        Ext.getCmp('vConciliationASR-txtDateFrom').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtDateTo').setVisible(false);
                        Ext.getCmp('vConciliationASR-cmbFilterStatusAmount').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtProcessingDate01').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtIATACode01').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtOpenDate02').setVisible(true);
                        Ext.getCmp('vConciliationASR-txtIATACode02').setVisible(true);
                        Ext.getCmp('vConciliationASR-txtGroup03').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtIDFile04').setVisible(false);
                        
                        Ext.getCmp('vConciliationASR-txtOpenDate02').focus();
                        break;
                    case 'GRUPO':
                        Ext.getCmp('vConciliationASR-txtDateFrom').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtDateTo').setVisible(false);
                        Ext.getCmp('vConciliationASR-cmbFilterStatusAmount').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtProcessingDate01').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtIATACode01').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtOpenDate02').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtIATACode02').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtGroup03').setVisible(true);
                        Ext.getCmp('vConciliationASR-txtIDFile04').setVisible(false);
                        
                        Ext.getCmp('vConciliationASR-txtGroup03').focus();
                        break;
                    case 'NROID':
                        Ext.getCmp('vConciliationASR-txtDateFrom').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtDateTo').setVisible(false);
                        Ext.getCmp('vConciliationASR-cmbFilterStatusAmount').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtProcessingDate01').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtIATACode01').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtOpenDate02').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtIATACode02').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtGroup03').setVisible(false);
                        Ext.getCmp('vConciliationASR-txtIDFile04').setVisible(true);
                        
                        Ext.getCmp('vConciliationASR-txtIDFile04').focus();
                        break;
                }
                break;
        }
    },
    tabInfo_tabchange: function(tabPanel, newTab, oldTab){
        switch(newTab.id){
            case 'vConciliationASR-gridDataByCurrency':
                var regExp = new RegExp('/','gi');
                var strStation = '',
                    strDateF,
                    strDateT;
                var gridTransactions = Ext.getCmp('vConciliationASR-gridTransactions');
                if (gridTransactions.getSelectionModel().hasSelection()) {
                    var row = gridTransactions.getSelectionModel().getSelection()[0];
                    strStation = row.get('STATION');
                    strDateF = row.get('FREPOR');
                    strDateT = row.get('FREPOR');
                }else{
                    strDateF = Ext.getCmp('vConciliationASR-txtDateFrom').getRawValue().replace(regExp, '');
                    strDateT = Ext.getCmp('vConciliationASR-txtDateTo').getRawValue().replace(regExp, '');
                }
                Ext.Ajax.request({
                    url: this.url + '/loadPX108S02PXF053',
                    params: {
                        vp_station: strStation,
                        vp_date_f: strDateF,
                        vp_date_t: strDateT
                    },
                    success: function (response, options) {
                        var resp = Ext.JSON.decode(response.responseText);
                        Ext.getCmp('vConciliationASR-gridDataByCurrency').getStore().loadData(resp.data);
                    }
                });
                break;
        }
    },
    gridTransactions_select: function(grid, record) {
        Ext.getCmp('vConciliationASR-gridDataByCurrency').getStore().removeAll();
    },
    gridTransactions_act1_itemClick: function(pRowIndex){
        this.vp_gridTransactions_rowIndex = pRowIndex;
        Ext.create('PXMVCAMHome.view.sales.ConciliationASR.DataEntryTransaction', {
            id: 'vConciliationASR-DataEntryTransaction-win'
        }).show();
    },
    gridDataByCurrency_act1_itemClick: function(pRowIndex){
        this.vp_gridDataByCurrency_rowIndex = pRowIndex;
        Ext.create('PXMVCAMHome.view.sales.ConciliationASR.ViewInteract', {
            id: 'vConciliationASR-ViewInteract-win'
        }).show();
    },
    gridDataByCurrency_act2_itemClick: function(pRowIndex){
        this.vp_gridDataByCurrency_rowIndex = pRowIndex;
        Ext.create('PXMVCAMHome.view.sales.ConciliationASR.DataEntry', {
            id: 'vConciliationASR-DataEntry-win'
        }).show();
    },
    gridDataPraxisVsInteract_act1_itemClick: function(pRowIndex){
        this.vp_gridDataPraxisVsInteract_rowIndex = pRowIndex;
        Ext.create('PXMVCAMHome.view.sales.ConciliationASR.ViewInteract', {
            id: 'vConciliationASR-ViewInteract-win'
        }).show();
    },
    gridDataPraxisVsInteract_act2_itemClick: function(pRowIndex){
        this.vp_gridDataPraxisVsInteract_rowIndex = pRowIndex;
        Ext.create('PXMVCAMHome.view.sales.ConciliationASR.DataEntry', {
            id: 'vConciliationASR-DataEntry-win'
        }).show();
    },
    DataEntry_center_afterrender: function (obj, e) {
        obj.reset();
        Ext.getCmp('vConciliationASR-DataEntry-gridPraxisDetail').getStore().removeAll();
        Ext.getCmp('vConciliationASR-DataEntry-boxPraxisDetail').setVisible(false);
        Ext.getCmp('vConciliationASR-DataEntry-win').height = 385;
        var row;
        var strSTAT,
            strDATE,
            strMDA;
        switch(Ext.getCmp('vConciliationASR-rg1').getValue().opt){
            case 'IP':
                row = Ext.getCmp('vConciliationASR-gridDataByCurrency').getStore().data.items[this.vp_gridDataByCurrency_rowIndex].data;
                strSTAT = row.WKSTAT.trim();
                strDATE = row.FREPOR.trim();
                strMDA = row.MDA.trim();
                break;
            case 'PI':
                row = Ext.getCmp('vConciliationASR-gridDataPraxisVsInteract').getStore().data.items[this.vp_gridDataPraxisVsInteract_rowIndex].data;
                strSTAT = row.A1530AGENT.trim();
                strDATE = row.A1530FDESD.trim();
                strMDA = row.A1530MDA.trim();
                break;
        }
        Ext.getCmp('vConciliationASR-DataEntry-txtWKSTAT').setValue(strSTAT);
        Ext.getCmp('vConciliationASR-DataEntry-txtFREPOR').setValue(String(strDATE).substr(0, 4) + '/' + String(strDATE).substr(4, 2) + '/' + String(strDATE).substr(6, 2));
        Ext.getCmp('vConciliationASR-DataEntry-txtMDA').setValue(strMDA);
        //CASH
        Ext.getCmp('vConciliationASR-DataEntry-txtInteractCA').setValue(Ext.util.Format.number(parseFloat(row.SCASH) + parseFloat(row.RCASH), '0,000.00'));
        Ext.getCmp('vConciliationASR-DataEntry-txtPraxisCA').setValue(Ext.util.Format.number(parseFloat(row.A1530_A1720_CA_SUM), '0,000.00'));
        Ext.getCmp('vConciliationASR-DataEntry-txtDifferencesCA').setValue(Ext.util.Format.number((parseFloat(row.SCASH) - parseFloat(row.RCASH)) - parseFloat(row.A1530_A1720_CA_SUM), '0,000.00'));
        //CREDIT            
        Ext.getCmp('vConciliationASR-DataEntry-txtInteractCC').setValue(Ext.util.Format.number(parseFloat(row.SCREDIT) - parseFloat(row.RCREDIT), '0,000.00'));
        Ext.getCmp('vConciliationASR-DataEntry-txtPraxisCC').setValue(Ext.util.Format.number(parseFloat(row.A1530_A1720_CC_SUM), '0,000.00'));
        Ext.getCmp('vConciliationASR-DataEntry-txtDifferencesCC').setValue(Ext.util.Format.number((parseFloat(row.SCREDIT) - parseFloat(row.RCREDIT)) - parseFloat(row.A1530_A1720_CC_SUM), '0,000.00'));

        var strIndicator;
        var bolEnabled;
        switch(row.STATUS.trim()) {
            case 'A': //MATCH AUTOMATIC.
                strIndicator = 'A';
                bolEnabled = false;
                break;
            case 'M': //MATCH MANUAL.
                strIndicator = 'M';
                bolEnabled = true;
                break;
            case 'D': //DIFFERENCE.
                strIndicator = 'D';
                bolEnabled = true;
                break;
            case '': //CALCULATE.
                if(
                        ((parseFloat(row.SCASH) - parseFloat(row.RCASH)) - parseFloat(row.A1530_A1720_CA_SUM)) === 0 &&
                        ((parseFloat(row.SCREDIT) - parseFloat(row.RCREDIT)) - parseFloat(row.A1530_A1720_CC_SUM)) === 0
                ){
                    strIndicator = 'A';
                    bolEnabled = false;
                }else{
                    strIndicator = 'D';
                    bolEnabled = true;
                }
                break;
        }
        Ext.getCmp('vConciliationASR-DataEntry-txtIndicator').setReadOnly(!bolEnabled);
        if(bolEnabled){
            Ext.getCmp('vConciliationASR-DataEntry-txtIndicator').focus(true, 100);
        }else{
            Ext.getCmp('vConciliationASR-DataEntry-txtComment').focus(true, 100);
        }
        Ext.getCmp('vConciliationASR-DataEntry-txtIndicator').setValue(strIndicator);
        Ext.getCmp('vConciliationASR-DataEntry-txtComment').setValue(row.COMENT.trim());

        Ext.getCmp('vConciliationASR-DataEntry-txtUser').setValue(row.userLastModify.trim());
        Ext.getCmp('vConciliationASR-DataEntry-txtDate').setValue(row.dateLastModify.trim());
    },
    DataEntry_lblPRAXIS_render: function(c){
        var me = this;
        c.getEl().on({
            click: function(el){
                var row;
                var strCSABR,
                    strFPROG,
                    strMDA;
                switch(Ext.getCmp('vConciliationASR-rg1').getValue().opt){
                    case 'IP':
                        row = Ext.getCmp('vConciliationASR-gridDataByCurrency').getStore().data.items[me.vp_gridDataByCurrency_rowIndex].data;
                        strCSABR = row.HNAME.trim();
                        strFPROG = row.FREPOR.trim();
                        strMDA = row.MDA.trim();
                        break;
                    case 'PI':
                        row = Ext.getCmp('vConciliationASR-gridDataPraxisVsInteract').getStore().data.items[me.vp_gridDataPraxisVsInteract_rowIndex].data;
                        strCSABR = row.HNAME.trim();
                        strFPROG = row.A1530FDESD.trim();
                        strMDA = row.A1530MDA.trim();
                        break;
                }
                Ext.Ajax.request({
                    url: me.url + '/loadPX108S03A1530',
                    params: {
                        vp_csabr: strCSABR,
                        vp_fprog: strFPROG,
                        vp_mda: strMDA
                    },
                    success: function (response, options) {
                        var res = Ext.JSON.decode(response.responseText);
                        var arrayData = [];
                        Ext.Object.each(res.data, function (index, value) {
                            if(parseFloat(value.A1720_AMT) > 0){
                                arrayData.push(value);
                            }
                        });
                        if(arrayData.length > 0){
                            var gridPraxisDetail = Ext.getCmp('vConciliationASR-DataEntry-gridPraxisDetail');
                            gridPraxisDetail.getStore().loadData(arrayData);
                            if(arrayData.length <= 10){
                                gridPraxisDetail.height = (arrayData.length * 23) + 20 + 2;
                            }else{
                                gridPraxisDetail.height = (10 * 23) + 20 + 2;
                            }
                            var boxPraxisDetail = Ext.getCmp('vConciliationASR-DataEntry-boxPraxisDetail');
                            boxPraxisDetail.height = gridPraxisDetail.height + 4;
                            Ext.getCmp('vConciliationASR-DataEntry-win').height = 385 + boxPraxisDetail.height + 5;
                            boxPraxisDetail.setVisible(true);
                        }else{
                            Ext.Msg.alert('Message', 'Praxis Detail empty');
                        }
                    }
                });
            },
            scope: c
        });
    },
    resizeElAdd: function(objEl, intSize){
        this.resizeEl(objEl, intSize, 'ADD');
    },
    resizeElSub: function(objEl, intSize){
        this.resizeEl(objEl, intSize, 'SUB');
    },
    resizeElSet: function(objEl, intSize){
        this.resizeEl(objEl, intSize, 'SET');
    },
    resizeEl: function(objEl, intSize, strType){
        var regExp01 = new RegExp(/px/gi);
        console.info(objEl.dom.id + ':' + objEl.dom.style.height);
        switch(strType){
            case 'ADD':
                objEl.dom.style.height = (parseInt(objEl.dom.style.height.replace(regExp01,'')) + intSize) + 'px';
                break;
            case 'SUB':
                objEl.dom.style.height = (parseInt(objEl.dom.style.height.replace(regExp01,'')) - intSize) + 'px';
                break;
            case 'SET':
                objEl.dom.style.height = intSize + 'px';
                break;
        }
        console.info(objEl.dom.id + ':' + objEl.dom.style.height);
    },
    DataEntry_btnSave_click: function () {
        var me = this;
        var gridDataByCurrency;
        var gridDataPraxisVsInteract;
        var row;
        var strSTAT,
            strDATE,
            strMDA;
        switch(Ext.getCmp('vConciliationASR-rg1').getValue().opt){
            case 'IP':
                gridDataByCurrency = Ext.getCmp('vConciliationASR-gridDataByCurrency');
                row = gridDataByCurrency.getStore().data.items[me.vp_gridDataByCurrency_rowIndex].data;
                strSTAT = row.WKSTAT.trim();
                strDATE = row.FREPOR.trim();
                strMDA = row.MDA.trim();
                break;
            case 'PI':
                gridDataPraxisVsInteract = Ext.getCmp('vConciliationASR-gridDataPraxisVsInteract');
                row = gridDataPraxisVsInteract.getStore().data.items[me.vp_gridDataPraxisVsInteract_rowIndex].data;
                strSTAT = row.A1530AGENT.trim();
                strDATE = row.A1530FDESD.trim();
                strMDA = row.A1530MDA.trim();
                break;
        }
        //User input
        var pSTATUS = Ext.getCmp('vConciliationASR-DataEntry-txtIndicator').getValue();
        var pCOMENT = Ext.getCmp('vConciliationASR-DataEntry-txtComment').getValue();

        global.Msg({
            msg: win.getChangeMsn('U'),
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: me.url + '/setConciliacionASR',
                        params: {
                            strOption: 'U',
                            VP_WKSTAT: strSTAT,
                            VP_FREPOR: strDATE,
                            VP_MDA: strMDA,
                            VP_STATUS: pSTATUS,
                            VP_COMENT: pCOMENT
                        },
                        success: function (response, options) {
                            var res = Ext.decode(response.responseText);
                            if (parseInt(res.sql_code) !== 0) {
                                global.Msg({
                                    msg: res.msg,
                                    icon: 0,
                                    fn: function () {
                                    }
                                });
                            } else {
                                global.Msg({
                                    msg: res.msg,
                                    icon: 1,
                                    fn: function () {
                                        //exito
                                        Ext.getCmp('vConciliationASR-DataEntry-win').close();
                                        switch(Ext.getCmp('vConciliationASR-rg1').getValue().opt){
                                            case 'IP':
                                                gridDataByCurrency.getStore().removeAll();
                                                var tabInfo = Ext.getCmp('vConciliationASR-tabInfo');
                                                tabInfo.setActiveTab(gridDataByCurrency.id);
                                                tabInfo.fireEvent('tabchange', tabInfo, gridDataByCurrency);
                                                break;
                                            case 'PI':
                                                me.btnSearch_click();
                                                break;
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    },
    DataEntry_btnCancel_click: function(){
        Ext.getCmp('vConciliationASR-DataEntry-win').close();
    },
    ViewInteract_center_afterrender: function (obj, e) {
        obj.reset();
        var row;
        var strSTAT,
            strDATE;
        switch(Ext.getCmp('vConciliationASR-rg1').getValue().opt){
            case 'IP':
                row = Ext.getCmp('vConciliationASR-gridDataByCurrency').getStore().data.items[this.vp_gridDataByCurrency_rowIndex].data;
                strSTAT = row.WKSTAT.trim();
                strDATE = row.FREPOR.trim();
                break;
            case 'PI':
                row = Ext.getCmp('vConciliationASR-gridDataPraxisVsInteract').getStore().data.items[this.vp_gridDataPraxisVsInteract_rowIndex].data;
                strSTAT = row.A1530AGENT.trim();
                strDATE = row.A1530FDESD.trim();
                break;
        }
        Ext.Ajax.request({
            url: this.url + '/loadPX031S02PXF050',
            params: {
                vp_wkstat: strSTAT,
                vp_frepor: strDATE
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var strText = '',
                    strPrevRECOR = '';
                var intCountEmpty = 0,
                    i = -1;
                var bolAdd;
                var aTempRECOR = [];
                Ext.Object.each(res.data, function (index, value) {
                    i++;
                    if(value.RECOR.trim() !== '' && aTempRECOR.indexOf(value.RECOR) !== -1){
                        //Nothing.
                    }else{
                        bolAdd = false;
                        if(i === 0){
                            strPrevRECOR = value.RECOR;
                            bolAdd = true;
                        }else if(value.RECOR.trim() === '' && strPrevRECOR.trim() === ''){
                            if(++intCountEmpty <= 2){
                                bolAdd = true;
                            }
                        }else{
                            strPrevRECOR = value.RECOR;
                            if(value.RECOR.trim() === ''){
                                intCountEmpty = 1;
                            }else{
                                intCountEmpty = 0;
                            }
                            bolAdd = true;
                        }
                        if(bolAdd === true){
                            aTempRECOR.push(value.RECOR);
                            strText += value.RECOR + '\n';
                        }
                    }
                });
                if(strText !== ''){
                    Ext.getCmp('vConciliationASR-ViewInteract-txaSource').setValue(strText);
                }else{
                    Ext.Msg.alert('Message', 'Transaction source empty');
                }
            }
        });
    },
    ViewInteract_btnClose_click: function(){
        Ext.getCmp('vConciliationASR-ViewInteract-win').close();
    },
    DataEntryTransaction_center_afterrender: function (obj, e) {
        obj.reset();
        var row = Ext.getCmp('vConciliationASR-gridTransactions').getStore().data.items[this.vp_gridTransactions_rowIndex].data;
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtWKSTAT').setValue(row.WKSTAT);
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtFREPOR').setValue(String(row.FREPOR).substr(0, 4) + '/' + String(row.FREPOR).substr(4, 2) + '/' + String(row.FREPOR).substr(6, 2));
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtSEC').setValue(row.SEC);
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtBSEC').setValue(row.BSEC);
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtSEQ').setValue(row.SEQ);
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtSTATION').setValue(row.STATION);
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtCODE').setValue(row.CODE);
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtOPDT').setValue(row.OPDT);
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtOPTM').setValue(row.OPTM);
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtST').setValue(row.ST);
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtCLDT').setValue(row.CLDT);
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtCLTM').setValue(row.CLTM);
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtXTDT').setValue(row.XTDT);
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtXTTM').setValue(row.XTTM);
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtXTST').setValue(row.XTST);
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtVOIDS').setValue(row.VOIDS);
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtTTRANS').setValue(row.TTRANSP);
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtDIFFERENCES').setValue(row.diffTransactions);
        if(row.processState === 'MATCH'){
            Ext.getCmp('vConciliationASR-DataEntryTransaction-rg1').setValue({rgpState : 'M'});
        }else{
            Ext.getCmp('vConciliationASR-DataEntryTransaction-rg1').setValue({rgpState : 'D'});
        }
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txaComment').setValue(row.COMENT.trim());
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtSEQ').focus();
    },
    DataEntryTransaction_txtXTST_change: function(){
        this.DataEntryTransaction_calculateDIFFERENCES();
        this.DataEntryTransaction_defineSTATE();
    },
    DataEntryTransaction_txtVOIDS_change: function(){
        this.DataEntryTransaction_calculateDIFFERENCES();
        this.DataEntryTransaction_defineSTATE();
    },
    DataEntryTransaction_txtTTRANS_change: function(){
        this.DataEntryTransaction_calculateDIFFERENCES();
        this.DataEntryTransaction_defineSTATE();
    },
    DataEntryTransaction_btnUpdate_click: function () {
        var me = this;
        global.Msg({
            msg: win.getChangeMsn('U'),
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    if(me.DataEntryTransaction_validateDty() === true){
                        var strPSTATE = Ext.getCmp('vConciliationASR-DataEntryTransaction-rg1').getValue().rgpState;
                        Ext.getCmp('vConciliationASR-DataEntryTransaction-center').getForm().submit({
                            url: me.url + '/updateRecord',
                            method: 'POST',
//                            waitTitle: 'Processing',
//                            waitMsg: 'Response time...',
                            params: {
                                vp_pstate: strPSTATE
                            },
                            success: function (form, action) {
                                var res = Ext.JSON.decode(action.response.responseText);
                                if (parseInt(res.sql_code) !== 0) {
                                    global.Msg({
                                        msg: res.msg,
                                        icon: 0,
                                        fn: function () {
                                        }
                                    });
                                } else {
                                    global.Msg({
                                        msg: res.msg,
                                        icon: 1,
                                        fn: function () {
                                            //exito
                                            Ext.getCmp('vConciliationASR-DataEntryTransaction-win').close();
                                            me.btnSearch_click();
                                        }
                                    });
                                }
                            },
                            failure: function (form, action) {
                                if (action.failureType === 'server') {
                                    obj = Ext.JSON.decode(action.response.responseText);
                                    Ext.Msg.alert('Server Error!', obj.msg);
                                } else {
                                    Ext.Msg.alert('Warning!', action.response.responseText);
                                }
                            }
                        });
                    }
                }
            }
        });
    },
    DataEntryTransaction_btnClose_click: function(){
        Ext.getCmp('vConciliationASR-DataEntryTransaction-win').close();
    },
    DataEntryTransaction_validateDty: function(){
        var bolContinue = false;
        var form = Ext.getCmp('vConciliationASR-DataEntryTransaction-center');
        if(form.isValid()){
            bolContinue = true;
            var strFREPOR = Ext.getCmp('vConciliationASR-DataEntryTransaction-txtFREPOR').getValue();
            var lstMessage = [];
            if(parseInt(strFREPOR) > parseInt(this.vp_serverDate)){
                lstMessage.push('The reporting date should not be greater than the system date.');
                bolContinue = false;
            }
            var strOPDT_P1 = Ext.getCmp('vConciliationASR-DataEntryTransaction-txtOPDT').getValue().substring(0, 3); //NOV.
            var strOPDT_P2 = Ext.getCmp('vConciliationASR-DataEntryTransaction-txtOPDT').getValue().substring(3, 5); //24.
            if(this.DataEntryTransaction_validateDty_dateMonth(strOPDT_P1)){
                //Nothing.
            }else{
                lstMessage.push('The format of "OP Date" should be MMMDD. Example: "NOV24"');
                bolContinue = false;
            }
            if(this.DataEntryTransaction_validateDty_dateDay(strOPDT_P2)){
                //Nothing.
            }else{
                lstMessage.push('The format of "OP Date" should be MMMDD. Example: "DEC31"');
                bolContinue = false;
            }
            
            var strCLDT_P1 = Ext.getCmp('vConciliationASR-DataEntryTransaction-txtCLDT').getValue().substring(0, 3); //NOV.
            var strCLDT_P2 = Ext.getCmp('vConciliationASR-DataEntryTransaction-txtCLDT').getValue().substring(3, 5); //24.
            if(this.DataEntryTransaction_validateDty_dateMonth(strCLDT_P1)){
                //Nothing.
            }else{
                lstMessage.push('The format of "CL Date" should be MMMDD. Example: "NOV24"');
                bolContinue = false;
            }
            if(this.DataEntryTransaction_validateDty_dateDay(strCLDT_P2)){
                //Nothing.
            }else{
                lstMessage.push('The format of "CL Date" should be MMMDD. Example: "DEC31"');
                bolContinue = false;
            }
            
            var strXTDT_P1 = Ext.getCmp('vConciliationASR-DataEntryTransaction-txtXTDT').getValue().substring(0, 3); //NOV.
            var strXTDT_P2 = Ext.getCmp('vConciliationASR-DataEntryTransaction-txtXTDT').getValue().substring(3, 5); //24.
            if(this.DataEntryTransaction_validateDty_dateMonth(strXTDT_P1)){
                //Nothing.
            }else{
                lstMessage.push('The format of "XT Date" should be MMMDD. Example: "NOV24"');
                bolContinue = false;
            }
            if(this.DataEntryTransaction_validateDty_dateDay(strXTDT_P2)){
                //Nothing.
            }else{
                lstMessage.push('The format of "XT Date" should be MMMDD. Example: "DEC31"');
                bolContinue = false;
            }
            
            var strST = Ext.getCmp('vConciliationASR-DataEntryTransaction-txtST').getValue();
            if(strST === 'CL' || strST === 'AC' || strST === ''){
                //Nothing.
            }else{
                lstMessage.push('ST field can only contain values "CL" (Closed), "AC" (Automatic Closed) and "" (empty).');
                bolContinue = false;
            }
            
            if(bolContinue === false){
                var strMessage = '';
                Ext.Object.each(lstMessage, function (index, value) {
                    strMessage += value + '<br>';
                });
                Ext.Msg.alert('Message', 'You must correct the following errors and try again.<br><br>' + strMessage);
            }
        }else{
            Ext.Msg.alert('Message', 'Enter all required fields correctly.');
        }
        return bolContinue;
    },
    DataEntryTransaction_validateDty_dateMonth: function(strDT_P1){
        var bolContinue = false;
        if(strDT_P1 === 'JAN' || strDT_P1 === 'FEB' || strDT_P1 === 'MAR' || strDT_P1 === 'APR' || strDT_P1 === 'MAY' || strDT_P1 === 'JUN' || strDT_P1 === 'JUL' || strDT_P1 === 'AUG' || strDT_P1 === 'SET' || strDT_P1 === 'OCT' || strDT_P1 === 'NOV' || strDT_P1 === 'DEC'){
            bolContinue = true;
        }
        return bolContinue;
    },
    DataEntryTransaction_validateDty_dateDay: function(strDT_P2){
        var bolContinue = false;
        if(strDT_P2 === '01' || strDT_P2 === '02' || strDT_P2 === '03' || strDT_P2 === '04' || strDT_P2 === '05' || strDT_P2 === '06' || strDT_P2 === '07' || strDT_P2 === '08' || strDT_P2 === '09' || strDT_P2 === '10'
        || strDT_P2 === '11' || strDT_P2 === '12' || strDT_P2 === '13' || strDT_P2 === '14' || strDT_P2 === '15' || strDT_P2 === '16' || strDT_P2 === '17' || strDT_P2 === '18' || strDT_P2 === '19' || strDT_P2 === '20'
        || strDT_P2 === '21' || strDT_P2 === '22' || strDT_P2 === '23' || strDT_P2 === '24' || strDT_P2 === '25' || strDT_P2 === '26' || strDT_P2 === '27' || strDT_P2 === '28' || strDT_P2 === '29' || strDT_P2 === '30'
        || strDT_P2 === '31'
        ){
            bolContinue = true;
        }
        return bolContinue;
    },
    DataEntryTransaction_calculateDIFFERENCES: function(){
        var strXTST = Ext.getCmp('vConciliationASR-DataEntryTransaction-txtXTST').getValue();
        var strVOIDS = Ext.getCmp('vConciliationASR-DataEntryTransaction-txtVOIDS').getValue();
        var strTTRANS = Ext.getCmp('vConciliationASR-DataEntryTransaction-txtTTRANS').getValue();
        var intDIFF;
        var strDIFFERENCES;
        if(strXTST !== '' && strVOIDS !== '' && strTTRANS !== ''){
            intDIFF = parseInt(strXTST) - parseInt(strVOIDS) - parseInt(strTTRANS);
            strDIFFERENCES = intDIFF;
        }else{
            strDIFFERENCES = '-----';
        }
        Ext.getCmp('vConciliationASR-DataEntryTransaction-txtDIFFERENCES').setValue(strDIFFERENCES);
    },
    DataEntryTransaction_defineSTATE: function(){
        var strXTST = Ext.getCmp('vConciliationASR-DataEntryTransaction-txtXTST').getValue();
        var strVOIDS = Ext.getCmp('vConciliationASR-DataEntryTransaction-txtVOIDS').getValue();
        var strTTRANS = Ext.getCmp('vConciliationASR-DataEntryTransaction-txtTTRANS').getValue();
        var rg1 = Ext.getCmp('vConciliationASR-DataEntryTransaction-rg1');
        if(strXTST !== '' && strVOIDS === '' && strTTRANS === ''){
            rg1.setValue({rgpState : 'D'});
        }else if(
            (strXTST !== '' && strVOIDS === '' && strTTRANS !== '') ||
            (strXTST !== '' && strVOIDS !== '' && strTTRANS !== '')
        ){
            rg1.setValue({rgpState : 'M'});
        }else if(strXTST === '' && strVOIDS === '' && strTTRANS !== ''){
            rg1.setValue({rgpState : ''});
        }else{
            rg1.setValue({rgpState : ''});
        }
    }
});