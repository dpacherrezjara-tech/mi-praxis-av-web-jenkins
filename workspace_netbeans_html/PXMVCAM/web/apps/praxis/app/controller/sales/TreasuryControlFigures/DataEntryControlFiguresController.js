//Ext.define('Ext.Praxis.controller.sales.ControlFigures.DataEntryControlFiguresController',{
//    extend: 'Ext.app.ViewController',
//    alias: 'controller.DataEntryControlFiguresController',
//    gridA1720: {},
//    beanDetail: {},
//    afterRender: function(){
//        this.set_Clear();
//        this.execSearchDetail();
//    },
//    execSearchDetail: function() {
//        this.beanDetail.VP_A1720CCUST = this.gridA1720.CCUST;
//        this.beanDetail.VP_A1720GRUPO = this.gridA1720.A1530GROUPS;
//        this.beanDetail.VP_A1720TIPO  = this.gridA1720.A1720TIPO;  
//        this.beanDetail.VP_A1720STIPO = this.gridA1720.A1720STIPO;				
//        this.beanDetail.VP_TRANS = this.gridA1720.TRANS;
//        this.searchDetail(this.beanDetail);
//    },
//    gridDetail_ViewTkt_clickHandler: function(column, e, row, column, x, rowData) {
//        var data = x.record.data;
//        console.log(data);
//        global.Msg({
//            msg: 'Under Construction',
//            icon: 2,
//            buttons: 1
//        });
//    },
//    set_poneTitleTotals: function() {
//        Ext.getCmp(prototype.id+'-1-gridDataTkt_TitleColumn').setText("Amount "+ this.gridA1720.A1720STIPO);
//        Ext.getCmp(prototype.id+'-1-gridDataTkt_TitleTotals').setText(this.gridA1720.A1720TIPO_00+' ( '+ this.gridA1720.A1720STIPO +' )');
//        this.view.setTitle("DETAIL: "+this.gridA1720.A1720TIPO_00+' ( '+ this.gridA1720.A1720STIPO +' )');
//    },
//    set_Clear: function() {
//        Ext.getCmp(prototype.id+'-1-gridDataTkt').getStore().removeAll();
//        Ext.getCmp(prototype.id+'-1-gridDataTkt_TitleTotals').setText('');
//        Ext.getCmp(prototype.id+'-1-gridDataTkt_TitleColumn').setText('');
//        Ext.getCmp(prototype.id+'-1-txtTotalAountConcep').setValue('0.00');
//        this.view.setTitle('');
//    },
//    
//    btnExcel_click: function () {
//        Ext.Msg.show({
//            title: '.:PRAXIS:.',
//            msg: 'Download Excel ?',
//            buttons: Ext.MessageBox.OKCANCEL,
//            scope: this,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function(btn) {
//                if (btn === 'ok') {
//                    global.getFile(
//                        prototype.url+'/getDetailXLSX?beanString='+JSON.stringify(this.beanDetail)
//                    );
//                }
//            }
//        });
//    },
//    btnBack_click: function() {
//        this.view.close();
//    },
//    
//    //<editor-fold defaultstate="collapsed" desc="searchDetail">
//    searchDetail: function(beanDetail) {
//        var meDataEntry = this;
//        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
//            proxy: {
//                url: prototype.url+'/searchDetail'
//            },
//            listeners: {
//                beforeload: function(obj) {
//                    obj.proxy.extraParams = { beanString: JSON.stringify(beanDetail) };
//                },
//                load: function(obj, obj2, success, response, obj5) {
//                    var res = Ext.JSON.decode(response._response.responseText);
//                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id+'-1-paggin');
//                    var pagData = pag.getPageData();
//
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//
//                    Ext.getCmp(prototype.id+'-1-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id+'-1-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id+'-1-lbl-total').setText(total);
//                    // </editor-fold>
//                    if (res.success) {
//                        var file = {};
//                        if (obj.data.length > 0) {
//                            file = obj.data.items[0].data;
//                            meDataEntry.set_poneTitleTotals();
//                            Ext.getCmp(prototype.id+'-1-txtTotalAountConcep').setValue(Ext.util.Format.number(file.TOTALS, '0,000.00'));
//                        } else {
//                            global.Msg({ msg: 'Data not found' });
//                        }
//                    } else global.Msg({msg: res.sesion});
//                    global.clear();
//                }
//            }
//        });
//        Ext.getCmp(prototype.id+'-1-gridDataTkt').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id+'-1-paggin').bindStore(storeGridDatas);
//    },
//    //</editor-fold>
//    
//    pagFirst: function(obj, e) {
//        Ext.getCmp(prototype.id+'-1-paggin').moveFirst();
//    },
//    pagPrevious: function(obj, e) {
//        Ext.getCmp(prototype.id+'-1-paggin').movePrevious();
//    },
//    pagNext: function(obj, e) {
//        Ext.getCmp(prototype.id+'-1-paggin').moveNext();
//    },
//    pagLast: function(obj, e) {
//        Ext.getCmp(prototype.id+'-1-paggin').moveLast();
//    }
//});