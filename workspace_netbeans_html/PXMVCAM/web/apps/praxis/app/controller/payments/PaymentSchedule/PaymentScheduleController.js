
Ext.define('Ext.Praxis.controller.payments.PaymentSchedule.PaymentScheduleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PaymentScheduleController',
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
        prototype.id = 'PaymentScheduleForm';
        prototype.url = CONTEXTPATH + '/PaymentSchedule';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        

        this.control({
            //   -------------------Eventos Genericos --------------------
            '#PaymentScheduleForm-xpanel': {
                afterrender: this.xpanel_afterrender            
            },
            '#PaymentScheduleForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#PaymentScheduleForm-btnClear': {
                click: this.btnClear_click
            },
            '#PaymentScheduleForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#PaymentScheduleForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#PaymentScheduleForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#PaymentScheduleForm-btnBack': {
                click: this.btnBack_click
            },
            '#PaymentScheduleForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#PaymentScheduleForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#PaymentScheduleForm-btn-pag-next': {
                click: this.pagNext
            },
            '#PaymentScheduleForm-btn-pag-last': {
                click: this.pagLast
            }
//            //-----------------Eventos Especificos -------------------    
        });
    },
    
    xpanel_afterrender: function (obj, e) {
        this.btnSearch_click();  
        this.obtainData();
       
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
 
    obtainData: function() {

        this.dataObtain.COUNTRY = 2;
        
         Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res, 'res PRUEBA FER');
                if (res.success) {
                    
                    
                    me.lstCountry = res.lstCountry;
                    
                    var storeData3 = Ext.create('Ext.data.Store', {
                        data: me.lstCountry,
                        autoLoad: true
                    });

                    Ext.getCmp(prototype.id + '-cmbIN_COUNTRY').bindStore(storeData3);                 
                    Ext.getCmp(prototype.id + '-cmbIN_COUNTRY').setValue('');
                   
                   console.log(res.lstCountry);
                    global.clear();

                } else
                    global.Msg({msg: res.sesion});
            }
        });
      
 ////////////////////////////////////////////////////////////////////////////
 //////OBETENEMOS CBO DE PAISES DESDE NUESTRA CONSULTA DE TABLA //////////////
 ////////////////////////////////////////////////////////////////////////////
//        Ext.Ajax.request({
//            url: prototype.url + '/getPaises',
//            method: 'POST',
//            timeout: 60000000,
//            params: {beanString: JSON.stringify(this.dataObtain)},
//            success: function(response, options) {
//                var res = Ext.JSON.decode(response.responseText);              
//                var lstPaises = res.listaPaises;
//                
//                var storeDataPaises = Ext.create('Ext.data.Store', {
//                    data: lstPaises,
//                    autoLoad: true 
//                });
//                
//                Ext.getCmp(prototype.id + '-cmbIN_COUNTRY').bindStore(storeDataPaises);
//                
//                console.log("Paises cargados TEST:", storeDataPaises.getData().items);
//                
//                Ext.getCmp(prototype.id + '-cmbIN_COUNTRY').setValue('');
//
//            }
//        });
//        

    },
    
    setFormatParameter: function() {

        me.bean = {};
        
         me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtAGENTFILT').getValue();
         me.bean.IN_AGROUPD = Ext.getCmp(prototype.id + '-cmbAGROUPD').getValue()|| '';
         me.bean.SCOUNTRY = Ext.getCmp(prototype.id + '-cmbIN_COUNTRY').getValue()|| '';

        var beanString = JSON.stringify(me.bean);
        
        

        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
    },

    
    
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData();
        
        
    },
   

    setGridData: function() {
        win.lblUser_toolTip("Estructura: MPF116");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchGrid'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams =searchParams   ;                                    
                        
                    },
                    load: function(obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });
            
            global.clear();
            Ext.getCmp(prototype.id + '-gridPaySchedule').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    



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
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;       
        
        console.log(rec,'PRUEBA MESAJE');
        
        Ext.create('Ext.Praxis.view.payments.PaymentScheduleForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec.data,
                listaPaises : me.lstCountry,
                
                lst:me.lst
            }
        }).show();
    },
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
    
    
    

/////////////////////////////////////////////////////////////////////////7 
/////////////////////EXCEL USANDO API ////////////////7 
/////////////////////////////////////////////////////////////////////////7    
//
//
//
//    btnExcel_click: function () {
//        const {SAGENT, AGROUPD, SCOUNTRY} = me.bean;
//        let params = {
//            IN_SAGENT: SAGENT,
//            IN_AGROUPD: AGROUPD,
//            SCOUNTRY: SCOUNTRY
//
//        };
//
//
//        global.downloadFile(me.request, 'downloadPaymentSchedule', params, 'zip');
//
//
//    },
    
    
    
    
  
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
