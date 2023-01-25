/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Zenobio Perez
 */
Ext.define('Ext.Praxis.controller.salesaudit.SalesAuditAccepted.DataEntrySalesAuditAcceptedController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntrySalesAuditAcceptedController',
    BeanGuardar: {},
    urlWin01: CONTEXTPATH + '/SalesAuditAccepted',
    init: function (view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStoresFilters();
        this.cargaDatos();
    },
    cargaDatos: function () {
        var me = this;
        var cmbComent = Ext.getCmp(prototype.id9 + '-ComboReason');
        cmbComent.setStore(me.view.params.lstComment);
        var ComboSourceASR = Ext.getCmp(prototype.id9 + '-ComboSourceASR');
        var ComboSourceBSP = Ext.getCmp(prototype.id9 + '-ComboSourceBSP');
        var ComboSourceARC = Ext.getCmp(prototype.id9 + '-ComboSourceARC');
        if (me.view.params.fuente === 'BSP') {
            ComboSourceASR.hide();
            ComboSourceBSP.show();
            ComboSourceARC.hide();
        }
        if (me.view.params.fuente === 'ARC') {
            ComboSourceASR.hide();
            ComboSourceBSP.hide();
            ComboSourceARC.show();
        }
        if (me.view.params.fuente === 'ASR') {
            ComboSourceASR.show();
            ComboSourceBSP.hide();
            ComboSourceARC.hide();
        }
        /*rec = me.view.params.rec;
         this.BeanReason.VP_CIA = rec.data.A1672CCUST;
         this.BeanReason.VP_FRMSRIE = rec.data.A1672CCUST+""+ rec.data.A1672FORMA + "" + rec.data.A1672SERIE;
         this.BeanReason.VP_SEQ = rec.data.A1672SEQ;
         this.BeanReason.VP_CUPON = rec.data.A1672CUPON;
         this.BeanReason.VP_TRNCU = rec.data.A1672TRNCU;
         Ext.getCmp(prototype.id9 + '-griddata').getStore().removeAll();
         var mask = new Ext.LoadMask(Ext.getCmp(prototype.id9 + '-form'), {
         msg: 'Please Wait....'
         });
         mask.show();
         Ext.Ajax.request({
         url: this.urlWin01 + '/searchLstFOP',
         params: {beanString: JSON.stringify(this.BeanReason)},
         success: function (records, operation, success) {
         mask.hide();
         var res = Ext.decode(records.responseText);
         if (res.data.length > 0) {
         Ext.getCmp(prototype.id9 + '-griddata').getStore().loadData(res.data);
         } else {
         global.Msg({msg: "Data not found.", icon: 2, fn: function () {
         }});
         }
         }
         });*/
    },
    onCmbSelect: function (obj, records, eOpts) {
        var ComboReason = Ext.getCmp(prototype.id9 + '-ComboReason');
        if (obj.getValue() === 'N' || obj.getValue() === 'R') {
            ComboReason.show();
        } else {
            ComboReason.hide();
        }
    },
    setStoresFilters: function () {
        var ComboSourceASR = Ext.getCmp(prototype.id9 + '-ComboSourceASR');
        var ComboSourceBSP = Ext.getCmp(prototype.id9 + '-ComboSourceBSP');
        var ComboSourceARC = Ext.getCmp(prototype.id9 + '-ComboSourceARC');

        ComboSourceASR.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "D", "name": "Disputed"},
                {"code": "N", "name": "Rejected"},
                {"code": "R", "name": "Reaudited"},
                {"code": "J", "name": "Justified"},
                {"code": "Z", "name": "Authorized"},
                {"code": "P", "name": "Pending"}

            ]
        }));

        ComboSourceBSP.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "A", "name": "Approved"},
                {"code": "N", "name": "Rejected"},
                {"code": "R", "name": "Reaudited"},
                {"code": "J", "name": "Justified"},
                {"code": "Z", "name": "Authorized"}

            ]
        }));

        ComboSourceARC.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "A", "name": "Approved"},
                {"code": "N", "name": "Rejected"},
                {"code": "R", "name": "Reaudited"},
                {"code": "J", "name": "Justified"},
                {"code": "Z", "name": "Authorized"}

            ]
        }));
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id9 + '-griddata');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id9 + '-store-grid01'
        });

        grid01.setStore(store01);
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    onClickSave: function (btn) {
        var me = this;
        var vl_status = '';
        if (me.view.params.fuente === 'BSP') {
            vl_status = Ext.getCmp(prototype.id9 + '-ComboSourceBSP').getValue();
        }
        if (me.view.params.fuente === 'ASR') {
            vl_status = Ext.getCmp(prototype.id9 + '-ComboSourceASR').getValue();
        }
        if (me.view.params.fuente === 'ARC') {
            vl_status = Ext.getCmp(prototype.id9 + '-ComboSourceARC').getValue();
        }
        if (vl_status === 'N' || vl_status === 'R') {
            me.BeanGuardar.ROUTE = Ext.getCmp(prototype.id9 + '-ComboReason').getValue();
            ;

        } else {
            me.BeanGuardar.ROUTE = '';
        }
        if (Ext.getCmp(prototype.id9 + '-File').getValue().length > 80) {
            Ext.Msg.alert('.: PRAXIS :.', ' el tamaño del nombre del archivo debe de ser menor a 80');
            return;
        }
        me.BeanGuardar.OPCION = vl_status;
        me.BeanGuardar.TYPE = me.view.params.cmbOpcion;
        me.BeanGuardar.A1672FUENT = me.view.params.fuente;
        me.BeanGuardar.A1672CORREO = me.view.params.correo;
        me.BeanGuardar.A1672ARCHV = Ext.getCmp(prototype.id9 + '-File').getValue();
        me.BeanGuardar.A1580DESC2 = Ext.getCmp(prototype.id9 + '-Argument').getValue();
        if (me.view.params.cmbOpcion === 'M') {
            me.BeanGuardar.A1672TICKET = me.view.params.tktPattern;
        } else {
            me.BeanGuardar.A1672TICKET = '';
        }

        var form = Ext.getCmp(prototype.id9 + '-form').getForm();
        global.Msg({
            msg: 'Review ADM?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.id9 + '-form'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();
                    form.submit({
                        url: me.urlWin01 + '/marcarRev/',
                        waitMsg: 'Uploading your sure to upload the file...',
                        params: {beanString: JSON.stringify(me.BeanGuardar),
                            beanSelectedTkts: JSON.stringify(me.view.params.lstSelectedTkts)
                        },
                        success: function (fp, o) {
                            var res = Ext.decode(o.response.responseText);
                            mask.hide();
                            Ext.Msg.alert('Success', 'Your sure to upload the file "' + res.result + '" has been uploaded.');
                            var vp_icon = 0;
                            if (res.result === 'The record was saved successfully.') {
                                vp_icon = 1;
                            }
                            global.Msg({msg: res.result, icon: vp_icon, fn: function () {
                                    if (vp_icon === 1) {
                                        Ext.getCmp(prototype.id + '-Contenedor').getController().imgSearch_clickHandler();
                                        Ext.getCmp(prototype.id9 + '-win').close();

                                    }


                                }});
                        }
                    });
                    /*Ext.Ajax.request({
                     url: me.urlWin01 + '/insertTracing/',
                     params: {beanString: JSON.stringify(me.BeanSave)},
                     success: function (response, options) {
                     mask.hide();
                     var res = Ext.decode(response.responseText);
                     var vp_icon = 0;
                     if (res.result === 'RECORD INSERTED') {
                     vp_icon = 1;
                     }
                     global.Msg({msg: res.result, icon: vp_icon, fn: function () {
                     if (vp_icon === 1) {
                     Ext.getCmp(prototype.id4 + '-win').getController().SerechDatos();
                     Ext.getCmp(prototype.id + '-Contenedor').getController().imgSearch_clickHandler();
                     Ext.getCmp(prototype.id5 + '-win').close();
                     
                     }
                     
                     
                     }});
                     }
                     });*/
                }

            }
        });

    }

});



