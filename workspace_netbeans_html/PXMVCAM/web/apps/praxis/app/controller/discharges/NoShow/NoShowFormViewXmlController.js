
Ext.define('Ext.Praxis.controller.discharges.NoShow.NoShowFormViewXmlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id03 + '-noShowFormViewXmlController',
    url: CONTEXTPATH + '/NoShow',
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {                        
        var p = this.view.params;
        //console.log(p.rec.data.INFO);
        Ext.getCmp(prototype.id03 + '-NoShowFormViewXml').setTitle( 'SABRE XML - Ticket Number: ' + p.rec.data.TICKET_NUMBER);
        Ext.getCmp(prototype.id03 + '-INFO_XML').setValue(p.rec.data.INFO);
    },    
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id03 + '-NoShowFormViewXml').close();
    }

});
