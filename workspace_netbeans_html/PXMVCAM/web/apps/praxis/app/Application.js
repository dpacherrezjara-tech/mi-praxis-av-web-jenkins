
/**
 * @author: remicioluis
 */

Ext.define('Ext.Praxis.Application',{

    extend: 'Ext.app.Application',

    controllers: [
        'Root@Ext.Praxis.controller'
    ],

    /** 
     * Se agregar store de forma global
     */
    stores: [
        
    ],

    onBeforreLaunch: function(){
        this.callParent();
    }

});