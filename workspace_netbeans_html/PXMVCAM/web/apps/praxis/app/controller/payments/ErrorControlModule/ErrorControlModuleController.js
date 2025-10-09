
Ext.define('Ext.Praxis.controller.payments.ErrorControlModule.ErrorControlModuleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ErrorControlModuleController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    lstBank: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    dataObtain: {},

    init: function (view) {
        me = this;
        prototype.id = 'ErrorControlModuleForm';
        prototype.url = CONTEXTPATH + '/ErrorControlModule';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);



        this.control({
            //   -------------------Eventos Genericos --------------------
            '#ErrorControlModuleForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ErrorControlModuleForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ErrorControlModuleForm-btnClear': {
                click: this.btnClear_click
            },
          
            '#ErrorControlModuleForm-btnFilter': {
                click: this.btnFilter_click
            },
            
            '#ErrorControlModuleForm-btnCALLSTORE': {
                click: this.btnCALLSTORE_click
            },
           
            '#ErrorControlModuleForm-btnBack': {
                click: this.btnBack_click
            },
            '#ErrorControlModuleForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ErrorControlModuleForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ErrorControlModuleForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ErrorControlModuleForm-btn-pag-last': {
                click: this.pagLast
            }
//            //-----------------Eventos Especificos -------------------    
        });
    },

    xpanel_afterrender: function (obj, e) {
        this.btnSearch_click();
        this.obtainData();

//        this.initDateCombos();

    },

    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    
    
    
    
    

    ////////////////////////////////////////////////////////////////////////////
    //////OBETENEMOS CBO DE PROCESADORES DESDE NUESTRA CONSULTA DE TABLA ///////
    ////////////////////////////////////////////////////////////////////////////

    obtainData: function (comboTarget) {

        var me = this;

        Ext.Ajax.request({
            url: prototype.url + '/getProcesador',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                console.log("Respuesta completa procesador:", response);
                var lstProcesador = res.listaProcesadores;

                var storeDataProcesadores = Ext.create('Ext.data.Store', {
                    data: lstProcesador,
                    autoLoad: true
                });

                var combo = comboTarget || Ext.getCmp(prototype.id + '-cmbIN_PROCESADOR');
                if (combo) {
                    combo.bindStore(storeDataProcesadores);
                    combo.setValue('');
                }

            }
        });


    },

    setFormatParameter: function () {

        me.bean = {};

        me.bean.IN_PF122CODPR = Ext.getCmp(prototype.id + '-cmbIN_PROCESADOR').getValue() || '';
        me.bean.IN_PF122CCUST = Ext.getCmp(prototype.id + '-cmbPF122CCUST').getValue() || '';
        
        me.bean.IN_PF122FLIQU_FROM = Ext.getCmp(prototype.id + '-FEC_FROM').getSubmitValue() || '';
        me.bean.IN_PF122FLIQU_TO   = Ext.getCmp(prototype.id + '-FEC_TO').getSubmitValue() || '';


        var beanString = JSON.stringify(me.bean);



        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
    },

    btnSearch_click: function (obj, e) {

        this.setFormatParameter();
        this.setGridData();


    },
    
    //LLAMADA STORE MPS210
    // Controller: btnCallStore_click (reemplaza tu versión)
   

    btnCallStore_click: function () {
        var me = this;

        var win = Ext.create('Ext.window.Window', {
            title: 'Ejecutar Proceso MPS210',
            modal: true,
            id: prototype.id + '-panelInputs',
            width: 380,
            layout: {type: 'vbox', align: 'stretch'},
            bodyPadding: 12,
            defaults: {labelWidth: 110, width: '100%', labelAlign: 'right'},
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Procesador',
                    itemId: 'cmbWinProcesador',
                    displayField: 'A4451KEY3',
                    valueField: 'A4451KEY2',
                    editable: false,
                    queryMode: 'local',
                    emptyText: 'Seleccione procesador...',
                    allowBlank: false,
                    
                    // PARA NO MODIFICAR EL VALOR INICIAL DEL STORE VALIDAMOS Y QUITAMOS EL ALL EN LA CARGA STORE
                    tpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                               '<div class="x-boundlist-item">',
                                   '{[values.A4451KEY3 === "ALL" ? "Seleccione procesador..." : values.A4451KEY3]}',
                                '</div>',
                            '</tpl>'
                            ),

                    // MODIFICA display
                    displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                                  '{[values.A4451KEY3 === "ALL" ? "Seleccione procesador..." : values.A4451KEY3]}',
                            '</tpl>'
                            )
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Fecha Proceso',
                    itemId: 'dtWinFechaProc',
                    format: 'Ymd',
                    allowBlank: true,
                    value: new Date()
                }
            ],
            buttons: [
                {
                    text: 'Aceptar',
                    width: 100,
                    handler: function () {
                        var procesador = win.down('#cmbWinProcesador').getValue();
                        var fecha = win.down('#dtWinFechaProc').getRawValue();

                        if (!procesador) {
                            Ext.Msg.alert('Validación', 'Debe eleigir Procesador.');
                            return;
                        }

                        // Llamada AJAX a tu backend para ejecutar el store
                        Ext.Ajax.request({
                            url: prototype.url + '/callStoreMPS210',
                            method: 'POST',
                            params: {
                                beforerequest: Ext.getCmp(prototype.id + '-panelInputs').mask('Loading...'),
                                V_CODPRO: procesador,
                                V_PRDA: fecha
                            },
                            success: function (response) {
                                Ext.getCmp(prototype.id + '-panelInputs').unmask('Loading...');
                                var data = Ext.decode(response.responseText);
                                Ext.Msg.alert(
                                        data.success ? 'Éxito' : 'Error',
                                        data.message || (data.success ? 'Proceso ejecutado correctamente.' : 'Error al ejecutar el proceso.')
                                        );
                                win.close();

                                Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                       
                            },
                            failure: function () {
                                Ext.Msg.alert('Error', 'No se pudo conectar con el servidor.');
                            }
                        });
                    }
                },
                {
                    text: 'Cancelar',
                    width: 100,
                    handler: function () {
                        win.close();
                    }
                }
            ],
            buttonAlign: 'center' // 🔹 centra los botones
        });

        win.show();

        // 🔹 Cargamos el combo usando tu método ya existente
        me.obtainData(win.down('#cmbWinProcesador'));
    },



    
    //listamos

    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF122");
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
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;

                    },
                    load: function (obj) {
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
            Ext.getCmp(prototype.id + '-gridErrorControl').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },





    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;


        return msj;
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },

   

    btnBack_click: function (obj, e) {

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
    btnClear_click: function (obj, e) {

        Ext.getCmp(prototype.id + '-cmbIN_PROCESADOR')?.setValue('');
        Ext.getCmp(prototype.id + '-cmbPF122CCUST')?.setValue('');
        
        Ext.getCmp(prototype.id + '-FEC_FROM')?.setValue('');
        Ext.getCmp(prototype.id + '-FEC_TO')?.setValue('');
        
        

        this.btnSearch_click();


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
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
    },
    getPaggin: function () {
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
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    }


}
);
