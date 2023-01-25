Ext.define('Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrExchangeAnalisisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrExchangeAnalisisController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    columns2: {},
    bean: {},
    beanDet: {},
    beanTkt: {},
    meScrExchangeAnalisis: '',
    dw_excel: false,
    boxActual: '-boxMainDataScrExchangeAnalisis',
    drillDown: [],
    _path: '',
    // </editor-fold>
    init: function(view) {
        meScrExchangeAnalisis = this;
        console.log('ScrExchangeAnalisisController - initt');
        console.log(meScrExchangeAnalisis.drillDown);
        
        prototypeProgram.view = 'screens-abnormal-values-form';
        prototypeProgram.nprog = 'PX00000414';
        prototypeProgram.title = 'Warning Values';
        prototypeProgram.modulo = '';
    },
    afterRender: function() {
        console.log('ScrExchangeAnalisisController - after');
    },
    btnSearch_click: function(bean) {
        console.log(' ScrExchangeAnalisisController - btnSearch_click');
        
        this.bean = bean;
        console.log(this.bean);
        meScrExchangeAnalisis.drillDown = [];
        console.log('**********************='+meScrExchangeAnalisis.drillDown);
        this.btnSearchSrcExchangeAnalisis_click();
    },
    btnSearchSrcExchangeAnalisis_click: function() {

        console.log(' ScrExchangeAnalisisController - btnSearchSrcExchangeAnalisis_click');

        this.setFormatParameter();
        win.lblUser_toolTip("Estructura: IMF111");
        
        this.showGrid('-boxMainDataScrExchangeAnalisis');
        this.hidePagination_clickHandler();
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.screens.GridData', {
            proxy: {
                url: prototype.url + '/searchExchange'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: meScrExchangeAnalisis.searchParams, dw_excel: false};
                },
                load: function(obj) {
                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
//                        me.setTotalRowGridData(bean);
                        var nomFecha = 'Processing';
                        if(meScrExchangeAnalisis.bean.IN_TIPOFECHA === 'FPRDA'){
                            nomFecha= 'Processing';	
                        }else{
                            nomFecha= 'Accounting';		
                        }
                        Ext.getCmp(prototype.id+'-hdFecha').setText(nomFecha);
                        
                        Ext.getCmp(prototype.id + 'hdError1').setText(bean.dscError1);
                        Ext.getCmp(prototype.id + 'hdError2').setText(bean.dscError2);
                        Ext.getCmp(prototype.id + 'hdError3').setText(bean.dscError3);
                        Ext.getCmp(prototype.id + 'hdError4').setText(bean.dscError4);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-ChtExchangeMB_01').bindStore(storeGridDatas);

    },
    viewDetExchange_colHandler: function(param1,param2,param3,column, e, row, val, x, rowData,ab,ac,ad,af) {
        
        
        var cant = x.record.data[param1];
//        var strTipo = Ext.getCmp(prototype.id + '-gridData').headerCt.getGridColumns()[column].dataIndex.replace('lng', '');
        if(cant > 0) {
            meScrExchangeAnalisis.beanDet = x.record.data;
            meScrExchangeAnalisis.beanDet.IN_FLAGEX = param2;
            meScrExchangeAnalisis.beanDet.IN_RATED = param3;

            this.showGrid('-boxDetData');
            this.showPagination_clickHandler();

            console.log(meScrExchangeAnalisis.beanDet);
            this.searchDetExchange();
        }
        
        
        
//        
    },
    searchDetExchange: function() {

        win.lblUser_toolTip("Estructura: IMF110");
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.FlightConciliation.GridData', {/*20 filas*/
            proxy: {url: prototype.url + '/searchDetExchange'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id +  meScrExchangeAnalisis.boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(meScrExchangeAnalisis.beanDet),dw_excel:false};
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + meScrExchangeAnalisis.boxActual).unmask();

                    if (obj.data.length > 0) {
                        var Objtemp = obj.data.items[0].data;
                        
                        var pag = Ext.getCmp(prototype.id + '-pagginSrcExchange');
                        var pagData = pag.getPageData();
//                        console.log(pagData);
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        
                        Ext.getCmp(prototype.id + '-titDetExchange').setText('Sales Date : ' + Objtemp.strFormatDate);


                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetExchange').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-pagginSrcExchange').bindStore(storeGridDatas);
    },
    gridData_VIEWTKT_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var beanProMasterTicket = {};
        
        beanProMasterTicket.IN_CIA = data.CCIA;
        beanProMasterTicket.IN_FORMA = data.FORMA;
        beanProMasterTicket.IN_SERIE = data.SERIE;
        beanProMasterTicket.IN_SEQ = '00';

        console.log(beanProMasterTicket);
        
        win.displayProMasterTicket(this, 'AbnormalValue', beanProMasterTicket);
    },
    setFormatParameter: function() {
//        meScrExchangeAnalisis.bean = {};
        var beanString = JSON.stringify(meScrExchangeAnalisis.bean);
        this.searchParams = beanString;
//        console.log(meScrExchangeAnalisis.bean);
    },
    showGrid: function(nameGrid) {

        me.panelActual = nameGrid;//PARA PAGINACION
        
        Ext.getCmp(prototype.id + meScrExchangeAnalisis.boxActual).hide();

        meScrExchangeAnalisis.boxActual = nameGrid;
        meScrExchangeAnalisis.drillDown.push(meScrExchangeAnalisis.boxActual);

        Ext.getCmp(prototype.id + meScrExchangeAnalisis.boxActual).show();
    },
    imgBack_clickHandler: function() {
        
//        console.log(meScrRefund.drillDown)
        if (meScrExchangeAnalisis.drillDown.length > 1) {
            Ext.getCmp(prototype.id + meScrExchangeAnalisis.boxActual).hide();
            
//            else if(meScrExchangeAnalisis.boxActual === '-boxByTkt'){
//                meScrExchangeAnalisis.showPagination_clickHandler();
//            }
            
            meScrExchangeAnalisis.drillDown.pop();
            meScrExchangeAnalisis.boxActual = meScrExchangeAnalisis.drillDown[meScrExchangeAnalisis.drillDown.length - 1];
            me.panelActual = meScrExchangeAnalisis.boxActual;
            Ext.getCmp(prototype.id + meScrExchangeAnalisis.boxActual).show();
            
           if(meScrExchangeAnalisis.boxActual === '-boxMainDataScrExchangeAnalisis'){
                meScrExchangeAnalisis.hidePagination_clickHandler();
            }
        }
    },
    imgExcel_clickHandler: function () {
        
        console.log('imgExcel_clickHandler');
        meScrExchangeAnalisis.dw_excel = true;
        if(meScrExchangeAnalisis.boxActual === '-boxMainDataScrExchangeAnalisis'){
             meScrExchangeAnalisis.goURLpost('searchExchange',meScrExchangeAnalisis.searchParams,Ext.getCmp(prototype.id + '-gridDataScrExchangeAnalisis').config.columns.items);
        }else if(meScrExchangeAnalisis.boxActual === '-boxDetData'){
            meScrRefund.goURLpost('searchDetExchange',JSON.stringify(meScrExchangeAnalisis.beanDet),Ext.getCmp(prototype.id + '-gridDetExchange').config.columns.items);
        }else{
            meScrExchangeAnalisis.dw_excel = false;
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
    }
});