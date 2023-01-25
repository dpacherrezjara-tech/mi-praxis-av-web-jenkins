/**
 * Desarrollado por Luis Remicio
 * ------------------------------
 * 
 * Probar en la siguiente ruta: http://localhost:8084/AEROMEXICO/Home#widgets-examples
 * 
 */
prototype.id = 'Examples';
prototype.url = CONTEXTPATH + '/examples';
prototype.widthContenedor = 1366;
prototype.heightContenedor = 768;

prototype.facsimil_id = 'Facsimil';
prototype.prorrate_id = 'Prorrate';

Ext.define('Ext.Praxis.view.widgets.Examples.Examples', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.Examples',

    requires: [
        'Ext.Praxis.controller.widgets.Examples.ExamplesController',
        'Ext.Praxis.view.widgets.facsimil',
        'Ext.Praxis.view.widgets.prorrate',
    ],

    controller: 'ExamplesController',

    id: prototype.id + '-Contenedor',

    layout: {
        type: 'vbox',
        align: 'center'
    },

    bodyStyle: 'background-color: white;',
    border: false,
    scrollable: true,

    defaults: {
        border: false
    },

    listeners: {
        beforeShow: 'OnBeforeShow'
    },

    items: [
        /*{
            xtype: 'panel',
            id: prototype.id + '-contenedor-form',
            width: 800,
            height: 400,
            items: [
                {
                    xtype: 'facsimil',
                    id: prototype.facsimil_id + '-widget-facsimil'
                }
            ]
        },*/
        
        {
            xtype: 'panel',
            id: prototype.id + '-contenedor-form',
            width: 1370,
            height: 680,
            items: [
                {
                    xtype: 'prorrate',
                    id: prototype.facsimil_id + '-widget-prorrate'
                }
            ]
        }
        
    ]
});

