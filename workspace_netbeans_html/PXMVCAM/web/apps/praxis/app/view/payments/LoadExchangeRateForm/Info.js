Ext.define('Ext.Praxis.view.payments.LoadExchangeRateForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background: transparent;"',
    defaults: {
        bodyStyle: 'background: transparent;"',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: true,
                width: 750,
//                height: 700,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background: transparent;"',
                            layout: 'vbox',
                            width: 750,
                            height: 120,
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background: transparent;"',
                                    margin: '10 2 2 20',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Load File',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                                            width: 130,
                                            height: 25
                                        },
                                        
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'vbox',
                                    border: false,
                                    bodyStyle: 'background:#E5ECEF;',
        //                            margin: '5 2 5 30',
                                    defaults: {
                                        anchor: '100%',
        //                                width: 650
                                    },
                                    items: [

                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#E5ECEF;',
        //                                    margin: '0 2 4 30',
                                            defaults: {
                                                anchor: '100%',
        //                                        width: 1050
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 27},
                                                {
                                                    xtype: 'form',
                                                    id: prototype.id + '-form-01',
                                                    border: false,
                                                    bodyStyle: 'background-color: #E3EAF9;',
        //                                            padding: '0 0 5 7',
                                                    items: [{
                                                            xtype: 'filefield',
                                                            id: prototype.id + '-file',
                                                            name: 'excelfile',
                        //                                fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Update Excel</strong>',
                                                            allowBlank: true,
                                                            accept: '.txt',
                                                            labelWidth: 85,
                                                            width: 400,
                                                            buttonAlign: 'left', 
                                                            buttonText: 'Select excel...',
                                                            regex: /(.)+((\.txt)|(\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                                                            regexText: 'Only XLS and XLSX formats are accepted',
                                                            buttonConfig: {
                                                                text: '<strong>Select</strong>',
                                                                width: 80,
                                                                style: 'margin-right: 10px;' // Agregamos un margen derecho al botón
                                                            },
                                                            listeners: {
                                                                //change: 'onUploadChange'
                                                            }
                                                        }]
                                                },
                                                {xtype: 'tbspacer', width: 5},

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border: false,
                                            bodyStyle: 'background:#E5ECEF;',
                //                                    margin: '0 2 2 30',
                                            defaults: {
                                                anchor: '100%',
                //                                        width: 1080
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 27},
                                                {
                                                    xtype: 'button',
                                                    id: prototype.id + '-btn-upload',
                                                    margin: '6 5 5 0',
                                                    width: 80,
                                                    html: '<strong style="color:black;">Load</strong>',
                                                    style: 'background:#70E3EC;color:white;font-weight:bold;',
                                                    border: true,
                                                    listeners: {
                                                        click: 'onFileLoad'
                                                    }
                                                },
                                                
                                            ]
                                        },
                                    ]
                                },
                            ]
                        }
                    ],
                    
                },
                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ],
    
}
);


