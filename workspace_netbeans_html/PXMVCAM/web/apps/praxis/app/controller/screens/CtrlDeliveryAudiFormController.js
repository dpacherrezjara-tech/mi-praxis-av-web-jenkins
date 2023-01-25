/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.screens.CtrlDeliveryAudiFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CtrlDeliveryAudiFormController',
    BeanDelivery: {},
    urlWin01: CONTEXTPATH + '/ScrProrrateoNew',
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.cargaDatos();
    },
    cargaDatos: function () {
        var me = this;
        var busqueda = '/searchDelivery';
        if (String(me.view.params.TRNCU)==='RFND'){
            busqueda = '/searchDeliveryRFND';
        }
        /*var mask = new Ext.LoadMask(Ext.getCmp(prototype.id0 + '-form'), {
         msg: 'Please Wait....'
         });
         mask.show();*/
        
         me.BeanDelivery.TDNR = String(me.view.params.TDNR);
         me.BeanDelivery.FUENTE = String(me.view.params.FTE);
         me.BeanDelivery.IDFILE = String(me.view.params.IDFIL);
        Ext.Ajax.request({
            url: me.urlWin01 + busqueda,
             params: {beanString: JSON.stringify(me.BeanDelivery)},
           /* params: {
                TDNR: String(this.view.params.TDNR),
                FUENTE: String(this.view.params.FTE)
            },*/
            success: function (records, operation, success) {
                //mask.hide();
                var res = Ext.decode(records.responseText);
                if (res.strTextoBSP.length > 0) {
                    var template = new Ext.XTemplate(
                            '<tpl for=".">',
                            '<pre style="width: 100%; height: 100%; font-size: 11px !important;">',
                            '<code data-language="shell">',
                            '{code}',
                            '</code>',
                            '</pre>',
                            '</tpl>',
                            {
                                compiled: true
                            }
                    );
                    template.append(prototype.id0 + '-contenido_html', {
                        code: res.strTextoBSP
                    });
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }
            }
        });
    },

    onCancelClick: function (btn) {
        this.view.close();
    }
});



