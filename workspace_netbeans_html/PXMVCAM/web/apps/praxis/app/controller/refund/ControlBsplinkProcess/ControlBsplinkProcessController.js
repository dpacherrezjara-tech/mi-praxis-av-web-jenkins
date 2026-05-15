
Ext.define('Ext.Praxis.controller.refund.ControlBsplinkProcess.ControlBsplinkProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ControlBsplinkProcessController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry:[],
    lstBank:[],
    gridActual: '',
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    dataObtain: {},
    
    
    init: function(view) {
        me = this;
        prototype.id = 'ControlBsplinkProcessForm';
        prototype.url = CONTEXTPATH + '/ControlBsplinkProcess';
//        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
//        me.panelActual = '-panelGridData';
 //       global.selectedChild(me.childs, prototype.id + me.panelActual);
        

        this.control({
            //   -------------------Eventos Genericos --------------------
            '#ControlBsplinkProcessForm-xpanel': {
                afterrender: this.xpanel_afterrender            
            },
            '#ControlBsplinkProcessForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ControlBsplinkProcessForm-btnClear': {
                click: this.btnClear_click
            },
            '#ControlBsplinkProcessForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ControlBsplinkProcessForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ControlBsplinkProcessForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#ControlBsplinkProcessForm-btnBack': {
                click: this.btnBack_click
            },
            '#ControlBsplinkProcessForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ControlBsplinkProcessForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ControlBsplinkProcessForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ControlBsplinkProcessForm-btn-pag-last': {
                click: this.pagLast
            }
            //-----------------Eventos Especificos -------------------    
        });
    },
    
    xpanel_afterrender: function (obj, e) {
        this.btnSearch_click();  
//        this.obtainData();
       
    },
    
    
    
    
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
 
 
 ////////////////////////////////////////////////////////////////////////////
 ///////////////////OBETENEMOS CBO DE PAISES DEL MASTER/////////////////////////
 ////////////////////////////////////////////////////////////////////////////
// 
//    obtainData: function() {
//
//        this.dataObtain.COUNTRY = 2;
//        
//         Ext.Ajax.request({
//            url: prototype.urlMaster + '/obtainData',
//            method: 'POST',
//            timeout: 60000000,
//            params: {beanString: JSON.stringify(this.dataObtain)},
//            success: function (response, options) {
//                var res = Ext.JSON.decode(response.responseText);
//                console.log(res, 'res PRUEBA FER');
//                if (res.success) {
//                    
//                    
//                    me.lstCountry = res.lstCountry;
//                    
//                    var storeData3 = Ext.create('Ext.data.Store', {
//                        data: me.lstCountry,
//                        autoLoad: true
//                    });
//
//                    Ext.getCmp(prototype.id + '-cmbIN_COUNTRY').bindStore(storeData3);                 
//                    Ext.getCmp(prototype.id + '-cmbIN_COUNTRY').setValue('');
//                   
//                   console.log(res.lstCountry);
//                    global.clear();
//
//                } else
//                    global.Msg({msg: res.sesion});
//            }
//        });
//      
//    },

    
    
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridDataAvianca();
        
        
    },
    
    setFormatParameter: function () {
        
        me.bean = {};

        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        monthFrom = monthFrom < 10 && monthFrom !== "" ? "0" + monthFrom : monthFrom;
        monthTo = monthTo < 10 && monthTo !== "" ? "0" + monthTo : monthTo;
        dayFrom = dayFrom < 10 && dayFrom !== "" ? "0" + dayFrom : dayFrom;
        dayTo = dayTo < 10 && dayTo !== "" ? "0" + dayTo : dayTo;

        me.bean = {};
        me.bean.IN_DATEFROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + "" + monthFrom + ""
                + dayFrom;
        me.bean.IN_DATETO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + "" + monthTo + ""
                + dayTo;
 
        var beanString = JSON.stringify(me.bean);
        
        var params = {
            beanString: beanString,
            bean: me.bean
        };
        return params;

    },
    
    
    
    
    setGridDataAvianca: function () {

        this.showGrid('-panelMainAvianca');
        var parameters = this.setFormatParameter();
        me.searchParams = parameters.bean;
        console.log(parameters);
        var storeGridData = Ext.create('Ext.Refund.store.GridData', {
            proxy: {
                url: prototype.url + '/searchAvianca'
            }, listeners: {
                beforeload: function (obj) {
                     obj.proxy.extraParams = {
                        beanString: parameters.beanString
                    };
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        console.log(obj.data);
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataAvianca').bindStore(storeGridData);
        Ext.getCmp(prototype.id + '-gridDataAvianca').setStore(storeGridData);
    },
   
//
//    setGridData: function() {
//        win.lblUser_toolTip("Estructura: MPF116");
//        me.panelActual = '-panelGridData';
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        me.setWidthPie();
//        var msj = this.validateFields();
//        if (msj !== '') {
//            global.Msg({msg: msj
//            });
//        } else {
//            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
//                proxy: {
//                    url: prototype.url + '/searchGrid'
//                }, listeners: {
//                    beforeload: function(obj) {
//                        obj.proxy.extraParams =searchParams   ;                                    
//                        
//                    },
//                    load: function(obj) {
//                        var pag = Ext.getCmp(prototype.id + '-paggin');
//                        var pagData = pag.getPageData();
//                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//                        if (obj.data.length === 0) {
//                            global.Msg({
//                                msg: 'Data not found.'
//                            });
//                        }
//                    }
//                }
//            });
//            
//            global.clear();
//            Ext.getCmp(prototype.id + '-gridPaySchedule').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
//        }
//    },
    



    validateFields: function() {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    
    ///data entry ingreso ///
    
    onEditClick: function(grid, rowIndex, colIndex) {
        
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
//    winDataEntry: function(action, rec) {
//        action = action === null || action === undefined ? 'U' : action;
//        rec = rec === null || rec === undefined ? {} : rec;       
//        
//        console.log(rec,'PRUEBA MESAJE');
//        
//        Ext.create('Ext.Praxis.view.payments.PaymentScheduleForm.DataEntry', {
//            id: prototype.id + '-dataEntry',
//            params: {
//                action: action,
//                rec: rec.data,
//                listaPaises : me.lstCountry,
//                
//                lst:me.lst
//            }
//        }).show();
//    },
    btnBack_click: function(obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.setWidthPie();

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
    btnClear_click: function(obj, e) {
        
        Ext.getCmp(prototype.id + '-txtAGENTFILT')?.setValue('');
        Ext.getCmp(prototype.id + '-cmbIN_COUNTRY')?.setValue('');
        Ext.getCmp(prototype.id + '-cmbAGROUPD')?.setValue('');
        
        this.btnSearch_click(); 
        
      
    },
    
    
    btnExcel_click: function(obj, e) {

        this.setFormatParameter();
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
                fn: function(btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function() {
        
        this.setFormatParameter();
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(searchParams.beanString));
                console.log('prueba excel');
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    
    
    

    
    
    
    
  
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function() {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
        }
    },
    
    
    
    
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    }
   

  }
);
