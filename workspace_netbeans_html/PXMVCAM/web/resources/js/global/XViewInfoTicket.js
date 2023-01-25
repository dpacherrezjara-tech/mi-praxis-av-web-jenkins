/**
 * @class Ext.global.plugin.ViewProrrate
 * @extends Ext.form.Panel
 * @author jbazan
 */
Ext.define('Ext.global.XViewInfoTicket', {
     extend: 'Ext.Container',
     xtype: 'XViewInfoTicket',
     config: {
        layout: 'fit',
        autoScroll:false
     },
     config_:{},
     constructor: function(config){
        var me = this;
        me.config_=config;
        
        me.items=[];
        me.callParent();
     },
     salir:function(){
        Ext.getCmp(this.id+'-win').close();
     }
 });