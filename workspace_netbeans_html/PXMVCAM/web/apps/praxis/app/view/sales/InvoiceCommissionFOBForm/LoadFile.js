Ext.define('Ext.Praxis.view.sales.InvoiceCommissionFOBForm.LoadFile',{
    extend: 'Ext.window.Window',
    alias: 'widget.LoadFileInvoiceCommissionFOBForm',
    requires:[
        'Ext.Praxis.controller.sales.InvoiceCommissionFOB.LoadFileController'
    ],
    controller: 'LoadFileController',
    title:'Load File Invoice Commission FOB',
    id: prototype.idLoadFileFOB + '-win',
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
                                            xtype: 'form',
                                            id: prototype.idLoadFileFOB + '-form-01',
                                            layout: 'vbox',
                                            items: [{
                                                    xtype: 'filefield',
                                                    id: prototype.idLoadFileFOB + '-file',
                                                    name: 'excelfile', // prototype.idLoadFileFOB + '-File',
                                                    fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Upload File</strong>',
                                                    allowBlank: true,
                                                    accept: '.xlsx, .xls',
                                                    labelWidth: 130,
                                                    width: 400,
                                                    buttonText: 'Select file...',
                                                    regex: /(.)+((\.xlsx)|(\.xls)(\w)?)$/i,
                                                    regexText: 'Only XLS and XLSX formats are accepted',
                                                    buttonConfig: {
                                                        text : '<strong>Select file...</strong>',
                                                        width: 80,
                                                        glyph: 'xf3b6@Ionicons'
                                                    },
                                                    listeners:{
                                                        //change: 'onUploadChange'
                                                    }
                                                }


                                            ]
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
                    id:prototype.idLoadFileFOB+'-btn-upload',
                    html: '<strong style="color:white;">Upload</strong>',
                    style: 'background:#24678D;color:white;font-weight:bold;',
                    icon: 'resources/img/botones/process_load.png',
                    //disabled: true,
                    border: false,
                    listeners:{
                        click: 'onInsertClick'
                    }
                }
            ]
        }
    ]
});