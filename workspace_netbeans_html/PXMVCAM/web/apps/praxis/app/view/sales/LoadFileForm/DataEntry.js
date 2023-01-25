Ext.define('Ext.Praxis.view.sales.LoadFileForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryLoadFileForm',
    requires:[
        'Ext.Praxis.controller.sales.LoadFile.DataEntryLoadFileController'
    ],
    controller: 'DataEntryLoadFileController',
    title:'Load File Gran Plan',
    header:true,
    height:165,
    width:460,
    resizable:false,
    layout:'fit',
    modal:true,
    border: false,
    defaults: {
        border: false
    },
    items:[
        {
            xtype: 'form',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: #DFE5F4;"',
                            layout: 'vbox',
                            border: true,
                            margin: '0 2 4 2',
                            defaults: {
                                anchor: '100%',
                                width: 450
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: #DFE5F4;"',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        anchor: '100%',
                                        margin: '3 0 3 0',
                                        padding: '3 0 3 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Period From:',
//                                            style: 'font-weight:bold;color:#0B333C;',
                                            padding: '4 0 5 0',
                                            width: 125
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-txtPeriodDateFrom',
                                            fieldStyle: 'text-align:center;color:blue;',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYY/MM/DD',
                                            format: 'Y/m/d',
                                            minValue: new Date(2000, 00, 01),
                                            maxValue : new Date(),
                                            editable: false,
                                            width: 90,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format Valid YYYY/MM/DD'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'label',
                                            text: 'To:',
                                            padding: '4 0 5 0'
                                        },
                                        {xtype: 'tbspacer', width: 10},
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-txtPeriodDateTo',
                                            fieldStyle: 'text-align:center;color:blue;',
                                            formatText: '',
                                            invalidText: 'Type the date in the format: YYYY/MM/DD',
                                            format: 'Y/m/d',
                                            minValue: new Date(2000, 00, 01),
                                            maxValue : new Date(),
                                            editable: false,
                                            width: 90,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format Valid YYYY/MM/DD'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: #DFE5F4;"',
                                    layout: 'hbox',
                                    border: false,
                                    defaults: {
                                        anchor: '100%',
                                        margin: '3 0 3 0',
                                        padding: '3 0 3 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'filefield',
                                            id: prototype.id + '-txtFile',
                                            fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Upload File</strong>',
                                            labelWidth: 130,
                                            allowBlank: true,
                                            accept: '.xlsx, .xls',
                                            margin: '4 0 4 0',
                                            width: 400,
                                            regex: /(.)+((\.xlsx)|(\.xls)(\w)?)$/i,
                                            regexText: 'Only XLS and XLSX formats are accepted',
                                            buttonConfig: {
                                                text : '<strong>Select file...</strong>',
                                                width: 80
                                            },
                                            listeners:{
                                                change: 'onUploadChange'
                                            }
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
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
                    xtype: 'button',
                    id:prototype.id+'-btn-upload',
                    html: '<strong style="color:white;">Upload</strong>',
                    style: 'background:#24678D;color:white;font-weight:bold;',
                    icon: 'resources/img/botones/process_load.png',
                    disabled: true,
                    border: false,
                    listeners:{
                        click: 'onInsertClick'
                    }
                }
            ]
        }
    ]
});