Ext.define('Ext.Praxis.view.payments.ErrorControlModuleForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E1E6EC;',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '15px 0 15px 75px',
            layout: 'column',
            defaults: {
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [
                
                // combo fechas
                

                {xtype: 'tbspacer', width: 20},            
                 {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Liq. Date',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'datefield',
                        format: 'd/m/Y',
                        submitFormat: 'Ymd',
                        editable: false,
                        allowBlank: true,
                        margin: '0 5 0 0', // espacio entre campos
                        width: 160,
                         listeners: {
                            change: function (field) {
                                const form = field.up('form');
                                const desde = form.down('[name=FEC_DESDE]').getValue();
                                const hasta = form.down('[name=FEC_HASTA]').getValue();
                                if (desde && hasta && hasta < desde) {
                                    Ext.Msg.alert('Validación', 'La fecha "Hasta" no puede ser menor que la fecha "From".');
                                    field.setValue(null);
                                }
                            }
                        }
                    },
                    items: [
                        {
                            id: prototype.id + '-FEC_FROM',
                            name: 'FEC_DESDE',
                            emptyText: 'Desde'
                        },
                        {
                            
                            id: prototype.id + '-FEC_TO',
                            name: 'FEC_HASTA',
                            emptyText: 'Hasta'
                        }
                    ]
                }
                ,
               
               ///////////////////
               
                {
                    fieldLabel: 'Company',
                    xtype: 'combo',
                    width: 160,
                    labelWidth: 55,
                    style: 'margin-left:10px;',
                    hidden: false,
                    disabled: false,
                    id: prototype.id + '-cmbPF122CCUST',
                    queryMode: 'local',
                    allowBlank: true,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: false,
                    listConfig: {maxHeight: 130},
                    typeAhead: true,
                    valueField: 'value',
                    displayField: 'text',
                    emptyText: 'Seleccione...',

                    enableKeyEvents: true,

                    value: '', // Valor por defecto (All)
                    store: {
                        fields: ['value', 'text'],
                        data: [
                            {value: '', text: 'ALL'},
                            {value: '133', text: 'Lacsa'},
                            {value: '134', text: 'Avianca'},
                            {value: '202', text: 'Taca'},
                            {value: '547', text: 'Aerogal'}


                        ]
                    }
//                    listeners: {
//                        change: 'btnSearch_click'
//                    }
                },


                {xtype: 'tbspacer', width: 40},

                          {
                    xtype: 'label',
                    text: 'Processor:',
                    padding: '2 0 0 20',
                    width: 90
                },
                 
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbIN_PROCESADOR',
                    disabled: false,
                    width: 140,
                    queryMode: 'local',
                    
                    valueField: 'A4451KEY2',
                    displayField: 'A4451KEY3',
                    hidden: false,
                    editable: true,
                    minChars: 1,
                    hiddenLabel: false,
                    emptyText: 'Seleccione Procesador...',
                    margin: '0 10 0 0'
//                    listeners: {
//                        change: 'btnSearch_click'
//                    }
                },
                


                {xtype: 'tbspacer', width: 20}
     


                
                
                
                

//                {
//                    fieldLabel: 'Fase',
//                    xtype: 'combo',
//                    width: 200,
//                    labelWidth: 55,
//                    style: 'margin-right:10px;',
//                    hidden: false,
//                    disabled: false,
//                    id: prototype.id + '-cmbPF122SDATE',
//                    queryMode: 'local',
//                    allowBlank: true,
//                    forceSelection: true,
//                    selectOnFocus: true,
//                    caseSensitive: false,
//                    autoSelect: true,
//                    editable: false,
//                    listConfig: {maxHeight: 130},
//                    typeAhead: true,
//                    valueField: 'value',
//                    displayField: 'text',
//                    emptyText: 'Seleccione...',
//
//                    enableKeyEvents: true,
//
//                    value: '', // Valor por defecto (All)
//                    store: {
//                        fields: ['value', 'text'],
//                        data: [
//
//                            {value: 'AX', text: 'FASE 1'},
//                            {value: 'AX', text: 'FASE 2'}
//
//
//                        ]
//                    }
//
//                }



                //aqui agregamos mas filtros
            ]
        }
    ]
});



