Ext.define('Ext.Praxis.view.program.ProMasterTicketForm.Options', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-options',
    border: false,
    layout: {
        type: 'hbox',
        pack: 'end'
    },
    items: [
        {
            xtype: 'button',
            id:prototype.id+'-btnFacsimil0',
            html: '<strong>Facsimil</strong>',
            border: true,
            hidden: true,
            scale: 'small',
            margin: '4 0 2 0',
            width: 80,
            listeners:{
                click: 'btnFacsimil_clickHandler',
            }
        },
        {xtype: 'tbspacer', width: 5},
        {
            xtype: 'button',
            id:prototype.id+'-btnDelivery0',
            html: '<strong>Delivery</strong>',
            border: true,
            hidden: true,
            scale: 'small',
            margin: '4 0 2 0',
            width: 80,
            listeners:{
                click: 'btnDelivery_clickHandler',
            }
        },
        {xtype: 'tbspacer', width: 10},
        {
            xtype: 'panel',
            border: true,
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            id: prototype.id+'-btnSearch',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
                            listeners: {
                                click: 'imgSearch_clickHandler'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnTxt',
                            icon: 'resources/img/botones/16x16/txt.png',
                            tooltip: 'Export from Sabre to Plain Text File',
                            listeners: {
                                click: 'imgExportText_clickHandler'
                            }
                        },
                        {
                            xtype:'button',
                            id: prototype.id+'-btnBrowser',
                            icon: 'resources/img/botones/panel.png',
                            tooltip: 'Browser',
                            listeners: {
                                click: 'imgBrowser_clickHandler'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id+'-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter',
                            listeners: {
                                click: 'imgFilter_clickHandler',
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id+'-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
                            listeners: {
                                click: 'imgClear_clickHandler',
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id+'-btnBack',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Back',
                            listeners: {
                                click: 'imgBack_clickHandler',
                            }
                        }
                    ]
                }
            ]
        }
    ]
});