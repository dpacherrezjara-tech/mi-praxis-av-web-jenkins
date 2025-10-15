Ext.define('Ext.Praxis.view.payments.PaymentScheduleForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: true,
    bodyStyle: 'background-color: #E1E6EC;',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '15px 0 15px 15px',
            layout: 'column',
            defaults: {
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [

                {
                    xtype: 'label',
                    text: 'AGENT :',
                    padding: '2 0 0 20',
                    width: 80
                },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtAGENTFILT',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9a-zA-Z]/,
                    maxLength: 8,
                    width: 100,
                    enableKeyEvents: false,
                    listeners: {
                        keypress: 'btnSearch_click'
                    }
                },
                
                { xtype: 'tbspacer', width: 40 },
                

//
//                {
//                    fieldLabel: 'Country',
//                    xtype: 'combo',
//                    width: 200,
//                    labelWidth: 85,
//                    style: 'margin-right:10px;',
//                    hidden: false,
//                    disabled: false,
//                    id: prototype.id + '-cmbIN_COUNTRY',
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
//                    enableKeyEvents: true,
//                    triggerAction: 'all',
//                    value: '', // All por defecto
//                    store: {
//                        fields: ['value', 'text'],
//                        data: [
//                            {value: '', text: 'All'},
//                            {value: 'AR', text: 'Argentina'},
//                            {value: 'BO', text: 'Bolivia'},
//                            {value: 'BR', text: 'Brasil'},
//                            {value: 'CA', text: 'Canadá'},
//                            {value: 'CL', text: 'Chile'},
//                            {value: 'CN', text: 'China'},
//                            {value: 'CO', text: 'Colombia'},
//                            {value: 'CR', text: 'Costa Rica'},
//                            {value: 'CW', text: 'Curazao'},
//                            {value: 'DE', text: 'Alemania'},
//                            {value: 'DO', text: 'República Dominicana'},
//                            {value: 'EC', text: 'Ecuador'},
//                            {value: 'ES', text: 'España'},
//                            {value: 'FR', text: 'Francia'},
//                            {value: 'GB', text: 'Reino Unido'},
//                            {value: 'GT', text: 'Guatemala'},
//                            {value: 'HK', text: 'Hong Kong'},
//                            {value: 'HN', text: 'Honduras'},
//                            {value: 'IL', text: 'Israel'},
//                            {value: 'IN', text: 'India'},
//                            {value: 'IT', text: 'Italia'},
//                            {value: 'KR', text: 'Corea del Sur'},
//                            {value: 'MX', text: 'México'},
//                            {value: 'NI', text: 'Nicaragua'},
//                            {value: 'PA', text: 'Panamá'},
//                            {value: 'PE', text: 'Perú'},
//                            {value: 'PY', text: 'Paraguay'},
//                            {value: 'SV', text: 'El Salvador'},
//                            {value: 'US', text: 'Estados Unidos'},
//                            {value: 'UY', text: 'Uruguay'}
//                            // Agrega más si necesitas
//                        ]
//                    },
//                    listeners: {
//                        change: 'btnSearch_click'
//                    }
//                },
//
//                
//                 { xtype: 'tbspacer', width: 20 },
//                 
//                 
                  {
                    xtype: 'label',
                    text: 'COUNTRY :',
                    padding: '2 0 0 20',
                    width: 90
                },
                 
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbIN_COUNTRY',
                    disabled: false,
                    width: 130,
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    hidden: false,
                    editable: false,
                    hiddenLabel: false,
                    margin: '0 10 0 0',
//                    listeners: {
//                        change: 'btnSearch_click'
//                    }
                },
                
                { xtype: 'tbspacer', width: 40 },


                
    



                {
                    fieldLabel: 'Group',
                    xtype: 'combo',
                    width: 220,
                    labelWidth: 95,
                    style: 'margin-right:10px;',
                    hidden: false,
                    disabled: false,
                    id: prototype.id + '-cmbAGROUPD',
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
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    value: '', // Valor por defecto (All)
                    store: {
                        fields: ['value', 'text'],
                        data: [
                            {value: '', text: 'All'},
                            {value: 'Diario', text: 'Diario'},
                            {value: 'Mensual', text: 'Mensual'},
                            {value: 'Quincenal', text: 'Quincenal'},
                            {value: 'Semanal', text: 'Semanal'},
                            {value: '3 dias', text: '3 días'},
                            {value: '4  dias',text:'4 dias '}
                        ]
                    },
                    listeners: {
                        change: 'btnSearch_click'
                    }
}

                
                
                
                
                //aqui agregamos mas filtrso
            ]
        }
    ]
});



