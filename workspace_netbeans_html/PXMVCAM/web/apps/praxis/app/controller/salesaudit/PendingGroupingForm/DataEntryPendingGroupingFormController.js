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
Ext.define('Ext.Praxis.controller.salesaudit.PendingGroupingForm.DataEntryPendingGroupingFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryPendingGroupingFormController',
    BeanGuardar: {},
    urlWin01: '',
    init: function (view) {
        var me = this;
        this.urlWin01 = Ext.String.trim(this.view.params.url01);
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
        var cmbComent = Ext.getCmp(prototype.id2 + '-ComboReason');
        cmbComent.setStore(me.view.params.lstComment);
        
    },
    onCmbSelect: function (obj, records, eOpts) {
        var ComboReason = Ext.getCmp(prototype.id2 + '-ComboReason');
        if (obj.getValue() === 'N' || obj.getValue() === 'R') {
            ComboReason.show();
        } else {
            ComboReason.hide();
        }
    },
    setStoresFilters: function () {
        var ComboSource = Ext.getCmp(prototype.id2 + '-ComboSource');
        ComboSource.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "N", "name": "Rejected"},
                {"code": "R", "name": "Reaudited"},
                {"code": "J", "name": "Justified"},
                {"code": "Z", "name": "Authorized"}

            ]
        }));

        
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id2 + '-griddata');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id2 + '-store-grid01'
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
        var vl_status = Ext.getCmp(prototype.id2 + '-ComboSource').getValue();
        if (vl_status === 'N' || vl_status === 'R') {
            me.BeanGuardar.VP_ROUTE = Ext.getCmp(prototype.id2 + '-ComboReason').getValue();
            ;

        } else {
            me.BeanGuardar.VP_ROUTE = '';
        }
        if (Ext.getCmp(prototype.id2 + '-File').getValue().length > 80) {
            Ext.Msg.alert('.: PRAXIS :.', ' el tamaño del nombre del archivo debe de ser menor a 80');
            return;
        }
        me.BeanGuardar.VP_OPCION = vl_status;
        me.BeanGuardar.A1672FUENT = me.view.params.fuente;
        me.BeanGuardar.A1672ARCHV = Ext.getCmp(prototype.id2 + '-File').getValue();
        me.BeanGuardar.VP_DESPCRI = Ext.getCmp(prototype.id2 + '-Argument').getValue();
        
        var form = Ext.getCmp(prototype.id2 + '-form').getForm();
        global.Msg({
            msg: 'Review ADM?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.id2 + '-form'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();
                    form.submit({
                        url: me.urlWin01 + '/insertLisTracingFile/',
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
                                        Ext.getCmp(prototype.id + '-Contenedor').getController().onSearchClick();
                                        Ext.getCmp(prototype.id2 + '-win').close();

                                    }


                                }});
                        }
                    });
                }

            }
        });

    }

});



