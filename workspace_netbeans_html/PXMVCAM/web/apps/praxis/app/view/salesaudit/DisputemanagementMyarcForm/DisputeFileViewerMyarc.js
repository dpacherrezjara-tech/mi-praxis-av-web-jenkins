/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.DisputemanagementMyarcForm.DisputeFileViewerMyarc', {
    extend: 'Ext.window.Window',
    alias: 'widget.DisputeFileViewerMyarc',
    controller: 'DisputeFileViewerMyarcController',
    requires: [
        'Ext.Praxis.controller.salesaudit.DisputemanagementMyarcForm.DisputeFileViewerMyarcController'
    ],
    id:  prototype.idDisputeFileViewerMyarc + '-win',
    title: 'File Viewer',
    header: true,
    height: 650,
    width: 1000,
    border: false,
    resizable: false,
    layout: 'border',
    modal: true,
    //bodyStyle: 'background-color: white;',

    listeners: {
        beforeShow: 'OnBeforeShow'
    },
    items: [
        {
            region: 'west',
            id:  prototype.idDisputeFileViewerMyarc + '-panel-tree',
            width: 220,
            layout: 'fit',
            border: false,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'fas fa-plus-square'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'fas fa-minus-square'
                        }
                    ]
                }
            ]
        },
        {
            region: 'center',
            id:  prototype.idDisputeFileViewerMyarc + '-panel-viewer',
            layout: 'fit'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            defaults: {
                scale: 'medium'
            },
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Close',
                    id:  prototype.idDisputeFileViewerMyarc + '-btn-close',
                    iconCls: 'fas fa-window-close',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});