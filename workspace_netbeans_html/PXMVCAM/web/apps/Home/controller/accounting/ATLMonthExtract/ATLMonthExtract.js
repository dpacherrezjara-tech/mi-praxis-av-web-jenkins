/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : ATLMonthExtract                                   *
 * Created on : 18-10-2016, 16:35:42                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 18-10-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

/* global Ext, gloContextPath, gloServerDate, gloServerTime */

Ext.define('PXMVCAMHome.controller.accounting.ATLMonthExtract.ATLMonthExtract', {
    extend: 'Ext.app.Controller',
    views: [
        'accounting.ATLMonthExtract.ATLMonthExtractForm'
    ],
    url: gloContextPath + '/ATLMonthExtract',
    contentPanel: 1300,
    hiddenFilter: true,
    vp_serverDate: gloServerDate,
    vp_serverTime: gloServerTime,
    vp_aYears: [],
    vp_aMonths: [],
    vp_gridData_totalCount: 0,
    init: function () {
        console.log('1) APPLICATION ATL_MONTH_EXTRACT - CONTROLLER ATL_MONTH_EXTRACT - INIT');
        this.control({
            '#vATLMonthExtract-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#vATLMonthExtract-pagTool': {
                beforechange: this.pagTool_beforechange
            },
            '#vATLMonthExtract-btnSearch': {
                click: this.btnSearch_click
            },
            '#vATLMonthExtract-btnFilter': {
                click: this.btnFilter_click
            },
            '#vATLMonthExtract-btnClear': {
                click: this.btnClear_click
            },
            '#vATLMonthExtract-btnExcel': {
                click: this.btnExcel_click
            },
            '#vATLMonthExtract-btnBack': {
                click: this.btnBack_click
            },
            '#vATLMonthExtract-cmbDateFromYear': {
                select: this.cmbDateFromYear_select
            },
            '#vATLMonthExtract-cmbDateFromMonth': {
                select: this.cmbDateFromMonth_select
            }
        });
    },
    xpanel_afterrender: function(){
        this.vp_aYears = this.getYears();
        this.vp_aMonths = this.getMonths();
        var strYear = this.vp_serverDate.substring(0, 4);
        var strMonth = this.vp_serverDate.substring(4, 6);
        var strDate = strYear + '/' + strMonth + '/' + this.vp_serverDate.substring(6, 8);

        var storeGridDatas = Ext.create('PXMVCAMHome.store.accounting.ATLMonthExtract.GridDatas', {
            proxy: {
                url: this.url + '/loadSearch'
            },
            listeners: {
                beforeload: function(obj){
                    Ext.Object.each(Ext.getCmp('vATLMonthExtract-gridData').getView().el.up().up().down('tr.x-grid-row-summary').query('div.x-grid-cell-inner'), function (index, value) {
                        value.innerHTML = '&nbsp;';
                    });
                },
                load: function(obj){
                    var lstItems = obj.data.items;
                    if(lstItems.length > 0){
                        var row = lstItems[0].data;
                        var gridData = Ext.getCmp('vATLMonthExtract-gridData');
//                        var summaryRecordData = gridData.getView().getFeature(0).summaryRecord.data;
                        var lstGridRowSummary;
                        setTimeout(function(){
                            lstGridRowSummary = gridData.getView().el.up().up().down('tr.x-grid-row-summary').query('div.x-grid-cell-inner');
                            lstGridRowSummary[4].innerHTML = Ext.util.Format.number(row.O_AMOUNT, '0,000.00');
                        }, 1000);
                    }
                }
            }
        });
        Ext.getCmp('vATLMonthExtract-pagTool').bindStore(storeGridDatas);
        Ext.getCmp('vATLMonthExtract-gridData').bindStore(storeGridDatas);

        var lstYearAC = this.getYearAC();
        var lstMonthAC = this.getMonthAC();
        var cmbDateFromYear = Ext.getCmp('vATLMonthExtract-cmbDateFromYear');
        var cmbDateFromMonth = Ext.getCmp('vATLMonthExtract-cmbDateFromMonth');
        
        cmbDateFromYear.getStore().loadData(lstYearAC);
        cmbDateFromMonth.getStore().loadData(lstMonthAC);
        Ext.getCmp('vATLMonthExtract-cmbDateToYear').getStore().loadData(lstYearAC);
        Ext.getCmp('vATLMonthExtract-cmbDateToMonth').getStore().loadData(lstMonthAC);

        cmbDateFromYear.select(strYear);
        cmbDateFromYear.fireEvent('select', cmbDateFromYear, cmbDateFromYear.getStore().getById(strYear));
        cmbDateFromMonth.select(parseInt(strMonth));
        cmbDateFromMonth.fireEvent('select', cmbDateFromMonth, cmbDateFromMonth.getStore().getById(strMonth));

        this.btnSearch_click();
    },
    pagTool_beforechange: function(obj, page, opts) {
        obj.store.proxy.extraParams = {
            VP_YEARFROM: Ext.getCmp('vATLMonthExtract-cmbDateFromYear').getValue(),
            VP_MONTHFROM: Ext.getCmp('vATLMonthExtract-cmbDateFromMonth').getValue(),
            VP_YEARTO: Ext.getCmp('vATLMonthExtract-cmbDateToYear').getValue(),
            VP_MONTHTO: Ext.getCmp('vATLMonthExtract-cmbDateToMonth').getValue(),
            totrow: this.vp_gridData_totalCount
        };
    },
    btnSearch_click: function(){
        var me = this;
        var vFormFilter = Ext.ComponentQuery.query('[id=vATLMonthExtract-contentFilter] > form')[0];
        if (vFormFilter.isValid()) {
            var storeGridData = Ext.getCmp('vATLMonthExtract-gridData').getStore();
            storeGridData.removeAll();
            storeGridData.loadPage(1, {
                params: {
                    VP_YEARFROM: Ext.getCmp('vATLMonthExtract-cmbDateFromYear').getValue(),
                    VP_MONTHFROM: Ext.getCmp('vATLMonthExtract-cmbDateFromMonth').getValue(),
                    VP_YEARTO: Ext.getCmp('vATLMonthExtract-cmbDateToYear').getValue(),
                    VP_MONTHTO: Ext.getCmp('vATLMonthExtract-cmbDateToMonth').getValue()
                },
                callback: function(records, operation, success) {
                    me.vp_gridData_totalCount = storeGridData.getTotalCount();
                }
            });
        } else {
            Ext.Msg.alert('Message', 'Enter the required fields correctly.');
        }
    },
    btnFilter_click: function(){
        this.setHiddenFilter();
    },
    btnClear_click: function(){
        this.setClearFilter();
    },
    btnExcel_click: function(){
        var me = this;
//        global.getFile(this.url + '/loadSearchXLS?' + Ext.Object.toQueryString({
//            VP_YEARFROM: Ext.getCmp('vATLMonthExtract-cmbDateFromYear').getValue(),
//            VP_MONTHFROM: Ext.getCmp('vATLMonthExtract-cmbDateFromMonth').getValue(),
//            VP_YEARTO: Ext.getCmp('vATLMonthExtract-cmbDateToYear').getValue(),
//            VP_MONTHTO: Ext.getCmp('vATLMonthExtract-cmbDateToMonth').getValue()
//        }));
        Ext.Ajax.request({
            url: this.url + '/loadSearchXLS',
            params: {
                VP_YEARFROM: Ext.getCmp('vATLMonthExtract-cmbDateFromYear').getValue(),
                VP_MONTHFROM: Ext.getCmp('vATLMonthExtract-cmbDateFromMonth').getValue(),
                VP_YEARTO: Ext.getCmp('vATLMonthExtract-cmbDateToYear').getValue(),
                VP_MONTHTO: Ext.getCmp('vATLMonthExtract-cmbDateToMonth').getValue(),
                VP_FILENAME: 'Step6'
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);

                var strDomain = '/' + me.url + '/';
                var id = me.makeid();

                var strURL = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + strDomain + res.fileName +'?id='+id;
                window.open(strURL, 'ZipFile', 'toolbar=no, titlebar=no, location=no, resizable=yes, menubar=no, statusbar=no, scrollbar=no, height=320, width=1010, top=140, left=120');
            }
        });
    },
    btnBack_click: function(){
        inicio.home();
    },
    setClearFilter: function () {
        Ext.ComponentQuery.query('[id=vATLMonthExtract-contentFilter] > form')[0].getForm().reset();
        Ext.getCmp('vATLMonthExtract-gridData').getStore().removeAll();
        Ext.getCmp('vATLMonthExtract-pagTool').doRefresh(true);
    },
    setHiddenFilter: function () {
        this.hiddenFilter = !this.hiddenFilter;
        Ext.getCmp('vATLMonthExtract-contentFilter').setVisible(this.hiddenFilter);
        Ext.getCmp('vATLMonthExtract-btnFilter').setTooltip(this.hiddenFilter ? 'Hidden filter' : 'Display filter');
    },
    getYears: function(){
        var lstReturn = [];
        for(var i = (new Date().getFullYear() + 1); i >= 2008; i--){
            lstReturn.push(i);
        }
        return lstReturn;
    },
    getMonths: function(){
        var lstReturn = [];
        for(var i = 1; i <= 12; i++){
            lstReturn.push(i);
        }
        return lstReturn;
    },
    getYearCode: function(id){
        var strReturn = '0000';
        if(id !== 0) strReturn = id;
        return strReturn;
    },
    getMonthCode: function(id){
        var strReturn = '00';
        if(id !== 0) {
            if(id < 10){
                strReturn = '0' + id;
            }else{
                strReturn = id.toString();
            }
        }
        return strReturn;
    },
    getYearAC: function(){
        var me = this;
        var returnAC = [];
        Ext.Object.each(this.vp_aYears, function (index, value) {
            returnAC.push({data : value, label : me.getYearCode(value)});
        });
        return returnAC;
    },
    getMonthAC: function(){
        var me = this;
        var returnAC = [];
        Ext.Object.each(this.vp_aMonths, function (index, value) {
            returnAC.push({data : value, label : me.getMonthAbbreviation(me.getMonthCode(value))});
        });
        return returnAC;
    },
    getMonthAbbreviation: function(strDate){
        var strReturn = '';
        switch(parseInt(strDate)){
            case 1:
                strReturn = 'Jan';
                break;
            case 2:
                strReturn = 'Feb';
                break;
            case 3:
                strReturn = 'Mar';
                break;
            case 4:
                strReturn = 'Apr';
                break;
            case 5:
                strReturn = 'May';
                break;
            case 6:
                strReturn = 'Jun';
                break;
            case 7:
                strReturn = 'Jul';
                break;
            case 8:
                strReturn = 'Aug';
                break;
            case 9:
                strReturn = 'Sep';
                break;
            case 10:
                strReturn = 'Oct';
                break;
            case 11:
                strReturn = 'Nov';
                break;
            case 12:
                strReturn = 'Dec';
                break;
            default:
                strReturn = strDate;
        }
        return strReturn;
    },
    cmbDateFromYear_select: function(obj, records, eOpts) {
        var strYear = obj.getValue();
        var cmbDateToYear = Ext.getCmp('vATLMonthExtract-cmbDateToYear');
        cmbDateToYear.select(strYear);
        cmbDateToYear.fireEvent('select', cmbDateToYear, cmbDateToYear.getStore().getById(strYear));
    },
    cmbDateFromMonth_select: function(obj, records, eOpts) {
        var strMonth = obj.getValue();
        var cmbDateToMonth = Ext.getCmp('vATLMonthExtract-cmbDateToMonth');
        cmbDateToMonth.select(strMonth);
        cmbDateToMonth.fireEvent('select', cmbDateToMonth, cmbDateToMonth.getStore().getById(strMonth));
    },
    makeid: function()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
});