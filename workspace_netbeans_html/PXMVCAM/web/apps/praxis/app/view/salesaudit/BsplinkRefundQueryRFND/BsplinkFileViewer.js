/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Luis Remicio
 */

// prototype.id = 'BsplinkFileViewer';
// prototype.url = CONTEXTPATH + '/BsplinkRefundQueryRFND';

Ext.define('Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.BsplinkFileViewer',{
	extend: 'Ext.window.Window',
    alias: 'widget.BsplinkFileViewer',

    controller: 'BsplinkFileViewerController',

    requires:[
        'Ext.Praxis.controller.salesaudit.BsplinkRefundQueryRFND.BsplinkFileViewerController',
    ],
    id: prototype.id05 + '-win',

    title:'File Viewer',
    header:true,
    height:650,
    width:1000,
    border:false,
    resizable:false,
    layout:'border',
    modal:true,
    
    //bodyStyle: 'background-color: white;',

    listeners:{
        beforeShow: 'OnBeforeShow'
    },
    
    items:[
        {
            region: 'west',
            id: prototype.id05 + '-panel-tree',
            width: 220,
            layout: 'fit',
            border: false,
            dockedItems:[
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items:[
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
            id: prototype.id05 + '-panel-viewer',
            layout: 'fit'
        }
    ],
    
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            defaults:{
                scale: 'medium'
            },
            layout:{
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items:[
                {
                    text: 'Close',
                    id: prototype.id05+'-btn-close',
                    iconCls: 'fas fa-window-close',
                    listeners:{
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});