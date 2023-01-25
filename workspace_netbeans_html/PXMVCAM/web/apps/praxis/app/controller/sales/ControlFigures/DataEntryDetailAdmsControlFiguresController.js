Ext.define('Ext.Praxis.controller.sales.ControlFigures.DataEntryDetailAdmsControlFiguresController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDetailAdmsControlFiguresController',
    gridA1720: {},
    beanDetail: {},
    afterRender: function(){
        this.set_Clear();
        this.execSearchDetail();
    },
    execSearchDetail: function() {
        this.beanDetail.VP_A1720CCUST = this.gridA1720.CCUST;
        this.beanDetail.VP_A1720GRUPO = this.gridA1720.A1530GROUPS;
        this.beanDetail.VP_A1720TIPO  = this.gridA1720.A1720TIPO;  
        this.beanDetail.VP_A1720STIPO = this.gridA1720.A1720STIPO;				
        this.searchDetailAdms(this.beanDetail);
    },
    gridADM_act1_clickHandler: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        //console.log(data);
        var strTkt = data.DOCUMENTO;
        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = data.A714CIA;
        beanProMasterTicket.IN_FORMA = strTkt.substr(0, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(4, 6);
        beanProMasterTicket.IN_SEQ = data.A714SEQ;        
        //console.log(beanProMasterTicket);
        win.displayProMasterTicket(this, 'ViewControlFigures', beanProMasterTicket);        
        this.view.close();
        /* global.Msg({
            msg: 'Under Construction',
            icon: 2,
            buttons: 1
        });*/
    },
    set_poneTitleTotals: function() {
        win.setText('3-gridDataTkt_TitleTotals', this.gridA1720.A1720TIPO_00+' ( '+this.gridA1720.A1720STIPO.trim()+' )');
        this.view.setTitle("ADM/ACM/OTHER: "+this.gridA1720.A1720TIPO_00+' ( '+ this.gridA1720.A1720STIPO.trim() +' )');
    },
    set_Clear: function() {
        win.removeAll('3-gridDataAdmAcm');
        win.setText('3-gridDataTkt_TitleTotals', '');
        win.setValue('3-txtTotalAountConcep', '0.00');
        this.view.setTitle("");
    },
    
    btnBack_click: function() {
        this.view.close();
    },
    
    //<editor-fold defaultstate="collapsed" desc="searchDetailAdms">
    searchDetailAdms: function(beanDetail) {
        var me1 = this;
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
            proxy: {
                url: prototype.url+'/searchDetailAdms'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = { beanString: JSON.stringify(beanDetail) };
                },
                load: function(obj, obj2, success, response, obj5) {
                    me1.set_poneTitleTotals();
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pagData = win.getCmp('3-paggin').getPageData();

                    var currentPage = win.formatLngNumber(pagData.currentPage);
                    var pageCount = win.formatLngNumber(pagData.pageCount);
                    var total = win.formatLngNumber(pagData.total);

                    win.setText('3-lblPagActualTk', currentPage);
                    win.setText('3-lblPagTotalTk', pageCount);
                    win.setText('3-lblRowsTotalTk', total);
                    // </editor-fold>
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        var file = {};
                        if (obj.data.length > 0) {
                            file = obj.data.items[0].data;
                            win.setValue('3-txtTotalAountConcep', win.formatDblNumber(file.TOTALS).trim());
                        } else {
                            global.Msg({ msg: 'Data not found' });
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-3-gridDataAdmAcm').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-3-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    
    pagFirst: function(obj, e) {
        Ext.getCmp(prototype.id+'-3-paggin').moveFirst();
    },
    pagPrevious: function(obj, e) {
        Ext.getCmp(prototype.id+'-3-paggin').movePrevious();
    },
    pagNext: function(obj, e) {
        Ext.getCmp(prototype.id+'-3-paggin').moveNext();
    },
    pagLast: function(obj, e) {
        Ext.getCmp(prototype.id+'-3-paggin').moveLast();
    }
});