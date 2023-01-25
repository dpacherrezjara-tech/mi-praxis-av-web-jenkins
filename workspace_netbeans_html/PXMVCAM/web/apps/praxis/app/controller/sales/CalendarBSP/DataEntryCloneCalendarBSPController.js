Ext.define('Ext.Praxis.controller.sales.CalendarBSP.DataEntryCloneCalendarBSPController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCloneCalendarBSPController',

    init: function(view){
    },
    afterRender: function(){
        this.p = this.view.params;
        this.getDataInputs(this.p.IN_A1529ISOC, this.p.IN_A1529ANIO);
        /*
         * var IN_A1529ISOC = Ext.getCmp(prototype.id+'-IN_A1529ISOC').getValue();
        var cbxDateYear = Ext.getCmp(prototype.id+'-cbxDateYear').getValue();
        var IN_A1529ISOC = Ext.getCmp(prototype.id+'-IN_A1529ISOC').getValue();
        Ext.Ajax.request({
            url: prototype.url + '/cloneCalendarBSP',
            method: 'POST',
            timeout: 60000000,
            params: {
                IN_A1529ISOC: IN_A1529ISOC,
                IN_A1529ANIO: cbxDateYear,
                IN_ISOCTO: IN_ISOCTO
            },
            beforerequest: Ext.getBody().mask('Loading...'),
            success: function(response, options){
                Ext.getBody().unmask();
                var res = Ext.JSON.decode(response.responseText);
                var mensaje = res.intResult;
                global.Msg({
                    msg: mensaje
                });
                
            }
        });
         */
    },
    getDataInputs: function(IN_A1529ISOC, IN_A1529ANIO) {
        Ext.getCmp(prototype.id + '-lblISOC').setText(IN_A1529ISOC);
        Ext.getCmp(prototype.id + '-lblYear').setText(IN_A1529ANIO);
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onRunClick: function() {
        Ext.Ajax.request({
            url: prototype.url + '/cloneCalendarBSP',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryCloneValues(),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.intResult;
                Ext.getCmp('DataEntryCloneCalendarBSPForm').close();
                global.Msg({
                    msg: msg
                });
            }
        });
    },
    getDataEntryCloneValues: function() {
        var p = this.view.params;

        var IN_A1529ISOC = p.IN_A1529ISOC;
        var IN_A1529ANIO = p.IN_A1529ANIO;
        var IN_ISOCTO = Ext.getCmp(prototype.id + '-txtA1529ISOC2').getValue();
        
        return {
            IN_A1529ISOC: IN_A1529ISOC,
            IN_A1529ANIO: IN_A1529ANIO,
            IN_ISOCTO: IN_ISOCTO
        };
    }
    
});