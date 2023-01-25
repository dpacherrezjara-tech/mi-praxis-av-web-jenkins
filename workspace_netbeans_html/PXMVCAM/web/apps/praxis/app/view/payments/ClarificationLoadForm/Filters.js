Ext.define('Ext.Praxis.view.payments.ClarificationLoadForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults:  {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
//                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Bank Code:',
                    id: prototype.id+'-cmbBankCode',           
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 350,
                    labelWidth: 150,
                    hiddenLabel: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Input',
                    id: prototype.id+'-cmbInput',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 150,
                    width: 350,
                    hiddenLabel: false
                },
                {xtype: 'tbspacer', width: 50},
                {
                    xtype: 'form',
                    id: prototype.id + '-form-01',
                    border: false,
                    bodyStyle: 'background-color: #E3EAF9;',
//                    layout: 'vbox',
                    items: [{
                        xtype: 'filefield',
                        id: prototype.id + '-file',
                        name: 'excelfile',
                        fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Upload File</strong>',
                        allowBlank: true,
                        accept: '.xlsx, .xls',
                        labelWidth: 80,
                        width: 320,
                        buttonText: 'Select file...',
                        regex: /(.)+((\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                        regexText: 'Only XLS and XLSX formats are accepted',
                        buttonConfig: {
                            text : '<strong>Select file...</strong>',
                            width: 80,
    //                        glyph: 'xf3b6@Ionicons'
                        },
                        listeners:{
                            //change: 'onUploadChange'
                        }
                    }]
                },
                {xtype: 'tbspacer', width: 50},
                {
                    xtype: 'button',
                    id:prototype.id+'-btn-upload',
                    margin: '2 0 0 0',
                    html: '<strong style="color:white;">Upload</strong>',
                    style: 'background:#24678D;color:white;font-weight:bold;',
//                    icon: 'resources/img/botones/process_load.png',
                    //disabled: true,
                    border: false,
                    listeners:{
                        click: 'onLoadClick'
                    }
                }
            ]
        }
    ]
});



