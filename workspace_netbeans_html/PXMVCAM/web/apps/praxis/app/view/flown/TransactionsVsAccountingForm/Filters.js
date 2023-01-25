Ext.define('Ext.Praxis.view.flown.TransactionsVsAccountingForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {   
            xtype: 'form',
            id: prototype.id + '-contFilter',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults:  {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    id: prototype.id + '-pnlRutaExcel',
                    bodyStyle: 'background: transparent',
                    border: false,
                    items:[
                        {
                            xtype: 'filefield',
                            id: prototype.id + '-txtRutaExcel',
                            fieldLabel: '',
                            labelWidth: 20,
                            allowBlank: true,
                            accept: '.xls',
                            margin: '2 4 2 4',
                            width: 170,
                            listeners:{
                                change: 'onUploadChange'
                            },
                            regex: /(.)+((\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                            regexText: 'Only XLS formats are accepted',
                            buttonConfig: {
                                text : '<strong>Upload Excel File</strong>',
                                width: 110,
                                height: 25,
//                                cls: 'x-btn-upload x-btn-upload-txt',
//                                overCls: 'x-btn-upload-hover x-btn-upload-txt-hover'
                            }
                        }
//                        {
//                            xtype: 'button',
//                            id:prototype.id+'-btnSaveFilter',
//                            html: '<strong>Save</strong>',
//                            border: true,
//                            margin: '2 0 2 0',
//                            width: 80,
//                            listeners:{
//                                click: 'onSaveFilterClick'
//                            }
//                        }
                    ]
                }
            ]
        }

    ]
});
