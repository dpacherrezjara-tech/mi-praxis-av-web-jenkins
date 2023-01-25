Ext.define('Ext.Praxis.view.sales.InplantCommissionsForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryInplantCommissionsForm',
    requires:[
        'Ext.Praxis.controller.sales.InplantCommissions.DataEntryInplantCommissionsController'
    ],
    controller: 'DataEntryInplantCommissionsController',
    title:'Inplant Commissions',
    header:true,
    height:170,
//    height:400,
    width:340,
//    width:470,
    resizable:false,
    layout:'fit',
    modal:true,
    border: false,
    defaults: {
        border: false
    },
    items:[
        {
            xtype: 'panel',
            defaults:{
                border: false
            },
            items:[
                {
                    xtype: 'textfield',
                    fieldLabel: 'ID Lote',
                    labelWidth: 50,
                    id:prototype.id+'-txtIdLote2',
                    fieldStyle: 'text-align:center',
                    padding:'10px 5px 0px 5px',
                    width: '90%'
                },//{xtype: 'tbspacer', width: 10},
                {
                    xtype: 'form',
                    id: prototype.id + '-form-01',
                    layout: 'vbox',
                    padding:'5px 5px 0px 5px',
                    items: [
                        {
                            xtype: 'filefield',
                            id: prototype.id + '-File',
                            name: 'excelfile', // prototype.idADJLoadADJMassive + '-File',
                            fieldLabel: 'File',
                            allowBlank: true,
                            labelWidth: 50,
                            width: '90%',
                            buttonText: 'Select file...',
                            buttonConfig: {
                                glyph: 'xf3b6@Ionicons'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items:[
                {
                    html: '<strong style="background:#02476D;color:white;">Load</strong>',
                    style: "background:#02476D;",
                    id:prototype.id+'-btnLoad',
                    width: 100,
                    listeners:{
                        click: 'onLoadClick'
                    }
                },
                {
                    html: '<strong style="background:#02476D;color:white;">New</strong>',
                    style: "background:#02476D;",
                    hidden:true,
                    id:prototype.id+'-btnNew',
                    width: 100,
                    listeners:{
                        click: 'onNewClick'
                    }
                },
                {
                    html: '<strong style="background:#02476D;color:white;">Download .xls</strong>',
                    style: "background:#02476D;",
                    id:prototype.id+'-btnDownload',
                    width: 100,
                    listeners:{
                        click: 'onDownloadClick'
                    }
                },
                { xtype: 'tbspacer', width: 5 },
                {
                    html: '<strong style="background:#02476D;color:white;">Download .csv</strong>',
                    style: "background:#02476D;",
                    id:prototype.id+'-btnDownloadcsv',
                    width: 100,
                    listeners:{
                        click: 'onDownloadCSVClick'
                    }
                }
            ]
        }
    ]
});