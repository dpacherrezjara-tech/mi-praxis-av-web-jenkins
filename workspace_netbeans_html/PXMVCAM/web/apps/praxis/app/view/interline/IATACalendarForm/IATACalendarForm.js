// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'IATACalendarForm';
prototype.url = CONTEXTPATH+'/IATACalendar';
prototype.widthContenedor = 1100;
// </editor-fold>

Ext.define('Ext.Praxis.view.interline.IATACalendarForm.IATACalendarForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.IATACalendarForm',
    requires: [
        'Ext.Praxis.controller.interline.IATACalendar.IATACalendarController',
        'Ext.Praxis.view.interline.IATACalendarForm.Options',
        'Ext.Praxis.view.interline.IATACalendarForm.Filters',
        'Ext.Praxis.view.interline.IATACalendarForm.Info'
    ],
    controller: 'IATACalendarController',
    layout: {
        type: 'fit'
    },
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id + '-xpanel',
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    defaults: {
                        border: false,
                        autoScroll: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.widthContenedor,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        }
                                        ,
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        }
                                        ,
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            border: false,
                                            hidden: false,
                                            bodyStyle: 'background-color: transparent;',
                                            padding: '8 0',
                                            defaults: {
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    width: '30%',
                                                    layout: 'hbox',
                                                    border: false,
                                                    hidden: false,
                                                    bodyStyle: 'background-color: transparent;',
                                                    defaults: {
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: 'Open Period :',
                                                            width: 100,
                                                            padding: '4 0'
                                                        },
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'textfield',
                                                            id: prototype.id + '-txtPERIOD',
                                                            fieldStyle: 'text-align:center;',
                                                            width: 100,
                                                            readOnly: true
                                                        },
                                                        {xtype: 'tbspacer', width: 3},
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btnClose',
                                                            style: 'font-weight:bold;background:#024F79;',
                                                            html: '<strong style="background:#024F79;color:white;">Close Period</strong>',
                                                            border: true,
                                                            scale: 'small',
                                                            tooltip: 'Close Period',
                                                            width: 110,
                                                            listeners: {
                                                                click: 'btnClose_clickHandler'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                        ,
                                        {
                                            xtype: 'panel',
                                            height: 600,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: false,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id + '-info',
                                                            id: prototype.id + '-contentInfo'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});