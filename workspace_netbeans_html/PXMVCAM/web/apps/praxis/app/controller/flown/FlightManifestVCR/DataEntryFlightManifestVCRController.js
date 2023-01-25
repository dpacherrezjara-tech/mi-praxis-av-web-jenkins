/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.flown.FlightManifestVCR.DataEntryFlightManifestVCRController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/FlightManifestVCR',
    id: prototype.id + '-controller',
    p: {},
    editRuta: false,
    texto: '',
    me: '',
    /**
     * Constructor
     */
    init: function(view) {
        me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        Ext.getCmp(prototype.id + '-txtRutaTexto').setReadOnly(true);
        Ext.getCmp(prototype.id + '-btn_Generar').disable(true);
        Ext.getCmp(prototype.id + '-de-labelRuta').hide();
    }
    ,
    onGenerarClick: function(btn) {
        console.log("Click en el boton gnerar");
        Ext.getCmp(prototype.id + '-de-labelRuta').show();
        var etiqueta = Ext.getCmp(prototype.id + '-label');
        etiqueta.setHtml("<b>Tickets not found. Please check the route </b>")
    }
    ,
    onEditClick: function(btn) {
        console.log("Clic en EDIT");
        if (!me.editRuta) {
            Ext.getCmp(prototype.id + '-btn_Edit').setIcon('resources/img/botones/16x16/check.png');
            Ext.getCmp(prototype.id + '-txtRutaTexto').setReadOnly(false);

        } else {
            Ext.getCmp(prototype.id + '-btn_Edit').setIcon('resources/img/botones/16x16/1326498593_018.png');
            Ext.getCmp(prototype.id + '-txtRutaTexto').setReadOnly(true);
        }
        me.editRuta = !me.editRuta;
    },
    onEventKey: function(e, eOpts) {
        var etiqueta = Ext.getCmp(prototype.id + '-label');
        if (eOpts.getKey() === 13) {
            var date = Ext.getCmp(prototype.id + '-txtFecha_Texto');
            if (date.isValid()) {
                if (date.getValue() === null) {
                    global.Msg({
                        msg: "Date is Invalid (YYYYMMDD format required)"
                    });
                } else {
                    Ext.getCmp(prototype.id + '-de-labelRuta').hide();                    
                    this.generarRuta();
                }
            } else {
                global.Msg({
                    msg: "Date is Invalid (YYYYMMDD format required)"
                });
            }
        }
    },
    generarRuta: function() {

        var ruta = '';
        var apend = '';
        var date = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFecha_Texto').getValue(), 'Ym');
        var year = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFecha_Texto').getValue(), 'Y');
        var month = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFecha_Texto').getValue(), 'm') + "";
        var day = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFecha_Texto').getValue(), 'd') + "";

        var tdate = '201709';
        console.log(month);


        if (date >= tdate) {
            apend = year + '\\' + global.getMonthName(month);
        } else {
            apend = year + '\\' + 'MANIF-ENV-' + day + global.getMonthName(month).substr(0, 3);
        }
        ruta = '\\\\Px\\am\\INSUMOS-FLOWN\\FLIGHT-MANIFIEST\\' + apend;
        console.log(ruta);
        Ext.getCmp(prototype.id + '-txtRutaTexto').setValue(ruta);
        Ext.getCmp(prototype.id + '-btn_Generar').enable();
    }  ,
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
},
});


