//Ext.define('Ext.Praxis.controller.sales.ControlFigures.DataEntryDetailRefControlFiguresController',{
//    extend: 'Ext.app.ViewController',
//    alias: 'controller.DataEntryDetailRefControlFiguresController',
//    gridA1720: {},
//    beanDetail: {},
//    afterRender: function(){
//        console.log(this.gridA1720);
//        this.set_Clear();
//        this.execSearchDetail();
//    },
//    execSearchDetail: function() {
//        this.beanDetail.VP_A1720CCUST = this.gridA1720.CCUST;
//        this.beanDetail.VP_A1720GRUPO = this.gridA1720.A1530GROUPS;
//        this.beanDetail.VP_A1720TIPO  = this.gridA1720.A1720TIPO;  
//        this.beanDetail.VP_A1720STIPO = this.gridA1720.A1720STIPO;				
//        this.searchDetailRef(this.beanDetail);
//    },
//    gridRFND_act1_clickHandler: function(column, e, row, column, x, rowData) {
//        var data = x.record.data;
//        console.log(data);
//        global.Msg({
//            msg: 'Under Construction',
//            icon: 2,
//            buttons: 1
//        });
//        console.log(data.DOCUMENTO);
//        if(data.DOCUMENTO !== undefined){
//            console.log("Listo para mostrar");
////            twCtrMasterTicked.TicketNumber = data.DOCUMENTO;
////            twCtrMasterTicked.actionCode = App.DE_ACT_VIEW;
////            twCtrMasterTicked.init();
//        }
//    },
//    set_poneTitleTotals: function() {
//        Ext.getCmp(prototype.id+'2-gridDataTkt_TitleColumn').setText("Amount "+ this.gridA1720.A1720STIPO);
//        Ext.getCmp(prototype.id+'2-gridDataTkt_TitleTotals').setText(this.gridA1720.A1720TIPO_00+' ( '+ this.gridA1720.A1720STIPO +' )');
//        this.view.setTitle("REFUND: "+this.gridA1720.A1720TIPO_00+' ( '+ this.gridA1720.A1720STIPO +' )');
//    },
//    set_Clear: function() {
//        Ext.getCmp(prototype.id+'2-gridDataRfnd').getStore().removeAll();
//        this.view.setTitle('');
//    },
//    
//    btnExcel_click: function () {
//        global.getFile(
//            prototype.url+'/getDetailRefXLSX?beanString='+JSON.stringify(this.beanDetail)
//        );
//    },
//    btnBack_click: function() {
//        this.view.close();
//    },
//    
//    //<editor-fold defaultstate="collapsed" desc="searchDetailRef">
//    searchDetailRef: function(beanDetail) {
//        var meDetailRef = this;
//        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
//            proxy: {
//                url: prototype.url+'/searchDetailRef'
//            },
//            listeners: {
//                beforeload: function(obj) {
//                    obj.proxy.extraParams = { beanString: JSON.stringify(beanDetail) };
//                },
//                load: function(obj, obj2, success, response, obj5) {
//                    var res = Ext.JSON.decode(response._response.responseText);
//                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pagData = Ext.getCmp(prototype.id+'2-paggin').getPageData();
//
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//
//                    Ext.getCmp(prototype.id+'2-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id+'2-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id+'2-lbl-total').setText(total);
//                    // </editor-fold>
//                    if (res.success) {
//                        var file = {};
//                        if (obj.data.length > 0) {
//                            file = obj.data.items[0].data;
//                            meDetailRef.set_poneTitleTotals();
//                            Ext.getCmp(prototype.id+'2-txtTotalAountConcep').setValue(Ext.util.Format.number(file.TOTALS, '0,000.00'));
//                        } else {
//                            global.Msg({ msg: 'Data not found' });
//                        }
//                    } else global.Msg({msg: res.sesion});
//                    global.clear();
//                }
//            }
//        });
//        Ext.getCmp(prototype.id+'2-gridDataRfnd').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id+'2-paggin').bindStore(storeGridDatas);
//    },
//    //</editor-fold>
//    
//    pagFirst: function(obj, e) {
//        Ext.getCmp(prototype.id+'2-paggin').moveFirst();
//    },
//    pagPrevious: function(obj, e) {
//        Ext.getCmp(prototype.id+'2-paggin').movePrevious();
//    },
//    pagNext: function(obj, e) {
//        Ext.getCmp(prototype.id+'2-paggin').moveNext();
//    },
//    pagLast: function(obj, e) {
//        Ext.getCmp(prototype.id+'2-paggin').moveLast();
//    }
//});