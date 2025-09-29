Ext.define('Ext.Praxis.view.sales.CalendarBSPForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
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
            defaults: {
                labelStyle: 'font-weight:bold;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                //agregamos
                
                {xtype: 'tbspacer', width: 10},
                                {
                                    fieldLabel: 'Category',
                                    xtype: 'combo',
                                    width: 200,
                                    labelWidth: 65,
                                    style: 'margin-right:10px;',
                                    hidden: false,
                                    labelStyle: 'text-align: left; font-size: 12px;font-weight: bold;',
                                    fieldStyle: 'text-align: left; font-size: 12px;',
                                    disabled: false,
                                    id: prototype.id + '-typeCalendar',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    listConfig: {maxHeight: 130},
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: 'BLOCL',
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: 'BICCS', name: 'ICCS BSP'},
                                            {code: 'BLOCL', name: 'BSP LOCAL'},
                                            {code: 'CLOCAL', name: 'CASS LOCAL'},
                                            {code: 'ICASS', name: 'ICCS-CASS'}
                                        ]
                                    },
                                    listeners: {
                                        change: 'btnSearch_click'
                                    }
                                },
                                
                
                
                
                
                
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Processing Period:</strong>',
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 10px'
                },
                { xtype: 'tbspacer', width: 10 },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cbxDateYear',
                    queryMode: 'local',
                    triggerAction: 'all',
//                    editable:false,
//                    autoSelect: false,
                    enableKeyEvents: true,
//                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    width: 75,
                    listConfig: {height: 111},
                    anchor: '100%'
                },
                { xtype: 'tbspacer', width: 25 },
                {
                    xtype: 'label',
                    text: 'Country:',
                    padding: '8px 7px 8px 10px',
                    style: 'font-weight:bold;color:#000;',
                    width: 70
                },
                { xtype: 'tbspacer', width: 10 },
                {
                    xtype: 'textfield',
                    id:prototype.id+'-IN_A1529ISOC',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maxLength: 2,
                    width: 50,
                    listeners:{
                        change: 'onUpperValue',
                        keypress: 'onTextKeypress'
                    }
                },
               
                {xtype: 'tbspacer', width: 10},
                
                
                                ///AGREGAMOS BOTON PARA CARGA DE ARCHIVO Y SUBIDA

                                
                                {
                                    xtype: 'form',
                                    id: prototype.id + '-form-01',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    items: [{
                                            xtype: 'filefield',
                                            id: prototype.id + '-file',
                                            name: 'excelfile',
                                            allowBlank: true,
                                            accept: '.xlsx, .xls, .xlsb',
                                            labelWidth: 85,
                                            width: 400,
                                            style: 'font-weight:bold;',
                                            padding: '0px 1px 8px 1px',
                                            buttonAlign: 'left',
                                            buttonText: 'Select excel...',
                                            regex: /(.)+((\.xlsx)|(\.xls)|(\.xlsb)|(\.csv)(\w)?)$/i,
                                            regexText: 'Only XLS and XLSX formats are accepted',
                                            buttonConfig: {
                                                text: '<strong>Select</strong>',
                                                width: 80,
                                                style: 'margin-right: 10px;' // Agregamos un margen derecho al botón
                                            },
                                            listeners: {
                                                change: function (filefield, value) {
                                                    let fileName = value.replace(/^.*[\\\/]/, ''); // quita fakepath o cualquier ruta
                                                    Ext.Msg.alert('Archivo seleccionado', 'Archivo: ' + fileName);
                                                }
                                            }
                                        }]
                                },

                                {xtype: 'tbspacer', width: 10},
                
                 {xtype: 'tbspacer', width: 27},
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btn-upload',
                                    padding: '4 0 5 0',
                                    width: 70,
                                    html: '<strong style="color:black;">Load</strong>',
                                    style: 'background:#70E3EC;color:white;font-weight:bold;',
                                    border: true,
                                    listeners: {
                                        click: 'onFileLoad'
                                    }
                                },

                {xtype: 'tbspacer', width: 20},
                // aqui termina
                
                {
                    xtype: 'button',
                    id:prototype.id+'-btnCloneCalendar',
                    text : 'Clone calendar',
//                    text : '<span style="font-weight:bold; color:white;background-color:#02507A">Clone calendar</span>',
//                    style: "background-color:#02507A;",
                    listeners:{
                        click: 'onCloneCalendarClick'
                    }
                }
            ]
            
            
            
            
            
        }
    ]
});

