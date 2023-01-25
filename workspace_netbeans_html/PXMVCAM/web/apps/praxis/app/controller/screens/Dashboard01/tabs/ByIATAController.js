Ext.define('Ext.Praxis.controller.screens.Dashboard01.tabs.ByIATAController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ByIATAController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    columns2: {},
    bean: {},
    beanDet: {},
    meSales: '',
    dw_excel: false,
    boxActual: '-boxMainData',
    drillDown: [],
    _path: '',
    // </editor-fold>
    init: function(view) {
        meSales = this;
//        prototype.id = 'DataRequestedByBankForm';
//        prototype.url = CONTEXTPATH + '/DataRequestedByBank';
//        console.log(' ByIATAController - init');
//        this.btnSearch_click();
        meSales.drillDown.push(meSales.boxActual);
//        console.log(meSales.drillDown);
    },
    afterRender: function () {
        
        console.log('1-----------------------ByIATAController - afterweeeeeeeeeeee');
    },
    btnSearch_click: function(bean) {
        
        console.log('1--------------- ByIATAController - btnSearch_clickwaaaaaaaaaaaaaaaaaa');
//        this.bean = bean;
//        console.log(this.bean);
//        this.setFormatParameter();
//        this.search();
    },
    setFormatParameter: function () {
//        meSales.bean = {};
        var beanString = JSON.stringify(meSales.bean);
        this.searchParams = beanString;
        console.log(meSales.bean);
    },
    search: function() {
        console.log(' ByIATAController - search');
        console.log(prototype.url + '/searchTest');
        Ext.Ajax.request({
            url: prototype.url + '/searchTest',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString:this.searchParams,dw_excel:false},
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                console.log(response);

                var res = Ext.JSON.decode(response.responseText);
//                console.log(res.lstData[0]);
//                console.log(res.lstData[1]);
//                console.log(res.lstData[2]);
//                console.log(res.lstData[3]);
//                console.log(res.lstData[4]);
                var totals = res.lstData[0][0]; //P_SALES_PER_MONTH_TOTALS
                var lstData = res.lstData[1]; //P_SALES_PER_MONTH_DATA
                Ext.getCmp(prototype.id + '-lblTotalCpns').setText(Ext.util.Format.number(totals.TOTAL_CUPONS, '0,000'));
                console.log(lstData);
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstData,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridData').bindStore(storeData);
                
                Ext.getCmp(prototype.id + '-lblTotalCpns').setText(Ext.util.Format.number(totals.TOTAL_CUPONS, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalAmount').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT, '0,000'));
                Ext.getCmp(prototype.id + '-totAVG').setText(Ext.util.Format.number(totals.totAVG, '0,000.00'));
                
                Ext.getCmp(prototype.id + '-lblTotalCpnON').setText(Ext.util.Format.number(totals.TOTAL_CUPONS_ON, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalCpnONPerc').setText(Ext.util.Format.number(totals.CUPONS_ON_PERCENT, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblTotalAmountON').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT_ON, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalAmountONPerc').setText(Ext.util.Format.number(totals.AMOUNT_ON_PERCENT, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblTotalAvgON').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT_ON_AVG_RATE, '0,000.00'));
                
                Ext.getCmp(prototype.id + '-lblTotalCpnOFF').setText(Ext.util.Format.number(totals.TOTAL_CUPONS_OFF, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalCpnOFFPerc').setText(Ext.util.Format.number(totals.CUPONS_OFF_PERCENT, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblTotalAmountOFF').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT_OFF, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalAmountOFFPerc').setText(Ext.util.Format.number(totals.AMOUNT_OFF_PERCENT, '0,000.00'));
                Ext.getCmp(prototype.id + '-lblTotalAvgOFF').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT_OFF_AVG_RATE, '0,000.00'));
                
                Ext.getCmp(prototype.id + '-lblTotalQCPNSNR').setText(Ext.util.Format.number(totals.TOTAL_QCPNS0, '0,000'));
                Ext.getCmp(prototype.id + '-lblTotalAMOUNTNR').setText(Ext.util.Format.number(totals.TOTAL_AMOUNT0, '0,000'));
                
                
            }
        });
        
//        meSales.dw_excel = false;
        
    },
    clickDetSales_colHandler: function(param,column, e, row, column, x, rowData) {
//        console.log(param);

//        Ext.getCmp(field.id).setGroupValue(param);
        this.beanDet = x.record.data;
        this.beanDet.FlagFactor = param;
        this.showGrid('-boxDetDataS');
        console.log(Ext.getCmp(prototype.id+'-rbgpDetail'));
        if(param==='MIN'){
            Ext.getCmp(prototype.id+'-rbMIN').setValue(true);
        }else if(param==='MAX'){
            Ext.getCmp(prototype.id+'-rbMAX').setValue(true);
        }else{
            Ext.getCmp(prototype.id+'-rbBEL').setValue(true);
        }



        console.log(this.beanDet);
        this.viewDetSales_colHandler();
    },
    
    viewDetSales_colHandler: function() {
        
        this.beanDet.CITYO = Ext.getCmp(prototype.id + '-cmbcCitiesFrom').getValue();
        this.beanDet.CITYD = Ext.getCmp(prototype.id + '-cmbcCitiesTo').getValue();
        
        this.showPagination_clickHandler();
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
            proxy: {url: prototype.url + '/searchDetSales'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id +  meSales.boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(meSales.beanDet),dw_excel:false};
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + meSales.boxActual).unmask();
                    win.lblUser_toolTip("Estructura: IMF110");

                    if (obj.data.length > 0) {
                        var Objtemp = obj.data.items[0].data;

                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
//                        console.log(pagData);
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        Ext.getCmp(prototype.id + '-titDetSalesS').setText('Sale Date : ' + Objtemp.strFormatDate);


                        var v_storeCities = Ext.getCmp(prototype.id + '-cmbcCitiesFrom').getStore().data.length;
                        if(v_storeCities === 0){
                            meSales.obtainCities();
                        }


                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetSalesS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

        

    },
    showGrid: function (nameGrid) {
        
        Ext.getCmp(prototype.id + meSales.boxActual).hide();
        
        meSales.boxActual = nameGrid;
        meSales.drillDown.push(meSales.boxActual);  
        
        Ext.getCmp(prototype.id + meSales.boxActual).show();

//        console.log('showGrid == ' + meSales.drillDown);

        
    },
    imgBack_clickHandler: function () {
        
        if (meSales.drillDown.length > 0) {
                Ext.getCmp(prototype.id + meSales.boxActual).hide();
                meSales.drillDown.pop();
                meSales.boxActual = meSales.drillDown[meSales.drillDown.length-1];
                Ext.getCmp(prototype.id +  meSales.boxActual).show();
                
//                this.showGrid(meSales.drillDown[meSales.drillDown.length-1]);
                
                if(meSales.boxActual === '-boxMainData'){
                    this.hidePagination_clickHandler();
                }
                
        }
//        console.log('imgBack_clickHandler == ' + meSales.drillDown);
        
    },
    imgExcel_clickHandler: function () {
        
        console.log('excell');
        meSales.dw_excel = true;
        if(meSales.boxActual === '-boxMainData'){
            console.log(Ext.getCmp(prototype.id + '-gridSalesL').config.columns.items);
            meSales.goURLpost('searchSales',this.searchParams,Ext.getCmp(prototype.id + '-gridSalesL').config.columns.items);
        }else if(meSales.boxActual === '-boxDetDataS'){
            console.log(Ext.getCmp(prototype.id + '-gridDetSalesS').config.columns);
//            console.log(JSON.stringify(Ext.getCmp(prototype.id + '-gridDetSalesS').config.columns));
            meSales.goURLpost('searchDetSales',JSON.stringify(meSales.beanDet),Ext.getCmp(prototype.id + '-gridDetSalesS').config.columns);
        }else{
            meSales.dw_excel = false;
        }
    },
    goURLpost: function (method,parms,columns) {
        
        var js_columns = JSON.stringify(columns);
        
        var mapForm = document.createElement("form");
        mapForm.target = "_blank";
        mapForm.method = "POST"; // or "post" if appropriate
        mapForm.action = prototype.url + '/' +method+'?dw_excel=true';

        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "beanString";
        mapInput.value = parms;
        mapForm.appendChild(mapInput);
        
        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "columns";
        mapInput.value = js_columns;
        mapForm.appendChild(mapInput);

        document.body.appendChild(mapForm);


        mapForm.submit();
    },
    showPagination_clickHandler: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        Ext.getCmp(prototype.id + '-lblPagination').show();
    },
    hidePagination_clickHandler: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
        Ext.getCmp(prototype.id + '-lblPagination').hide();
    },
    obtainCities: function () {

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainCities',
            method: 'POST',
            timeout: 60000000,
//            beforerequest: Ext.getBody().mask('Loading...'),
            params: '',
            success: function(response, options) {
//                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lstCiudades = res.lstCiudades;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstCiudades,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbcCitiesFrom').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbcCitiesFrom').setValue('');
                Ext.getCmp(prototype.id + '-cmbcCitiesTo').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbcCitiesTo').setValue('');
//                global.clear();
            }
        });
        
    },
    rgchange: function(field, newvalue, oldvalue,options) {
//        this.beanDet.FlagFactor = param;
//        console.log(field);
        
        if (oldvalue) {
//            console.log(Ext.getCmp(field.id).getGroupValue());
            this.beanDet.FlagFactor = Ext.getCmp(field.id).getGroupValue();
            this.viewDetSales_colHandler();
        }
//        console.log(this.beanDet);
    },
    dateChange: function(field, newvalue, oldvalue) {
        var V_CDATE = Ext.getCmp(prototype.id + '-txtDateCreate').getValue();

        V_CDATE = Ext.util.Format.date(V_CDATE, 'Ymd');
        
        console.log(V_CDATE);
        
        this.beanDet.FECR = V_CDATE;
        console.log(this.beanDet);
        this.viewDetSales_colHandler();
    },
    gridData_VIEWTKT_clickHandler: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.TICKET;
        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
        beanProMasterTicket.IN_SEQ = '00';
        
        win.displayProMasterTicket(this, 'ABValues', beanProMasterTicket);
    }
    
});
