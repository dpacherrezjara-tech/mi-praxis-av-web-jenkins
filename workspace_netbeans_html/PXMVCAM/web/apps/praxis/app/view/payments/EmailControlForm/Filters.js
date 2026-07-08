Ext.define('Ext.Praxis.view.payments.EmailControlForm.Filters', {
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

//                {
//                    xtype: 'label',
//                    text: 'AGENT :',
//                    padding: '2 0 0 20',
//                    width: 80
//                },
//                {
//                    xtype: 'textfield',
//                    id: prototype.id + '-txtAGENTFILT',
//                    fieldStyle: 'text-align:center',
//                    enforceMaxLength: true,
//                    maskRe: /[0-9a-zA-Z]/,
//                    maxLength: 8,
//                    width: 100,
//                    enableKeyEvents: false,
//                    listeners: {
//                        keypress: 'btnSearch_click'
//                    }
//                },
//                
//                { xtype: 'tbspacer', width: 40 },
//           
//                  {
//                    xtype: 'label',
//                    text: 'COUNTRY :',
//                    padding: '2 0 0 20',
//                    width: 90
//                },
                 
//                {
//                    xtype: 'combo',
//                    id: prototype.id + '-cmbIN_COUNTRY',
//                    disabled: false,
//                    width: 130,
//                    queryMode: 'local',
//                    triggerAction: 'all',
//                    valueField: 'A006PAIS',
//                    displayField: 'A006NOMBRE',
//                    hidden: false,
//                    editable: false,
//                    hiddenLabel: false,
//                    margin: '0 10 0 0',
////                    listeners: {
////                        change: 'btnSearch_click'
////                    }
//                },
//                
                { xtype: 'tbspacer', width: 40 },


                
    



//                {
//                    fieldLabel: 'Process',
//                    xtype: 'combo',
//                    width: 220,
//                    labelWidth: 95,
//                    style: 'margin-right:10px;',
//                    hidden: false,
//                    disabled: false,
//                    id: prototype.id + '-cmbPROCESS',
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
//                    value: '', // Valor por defecto (All)
//                    store: {
//                        fields: ['value', 'text'],
//                        data: [
//                            {value: '', text: 'All'},
//                            {value: 'WEBOPERATIVA', text: 'Web Operativa'},
//                            {value: 'NUVEI', text: 'Nuvei'},
//                            {value: 'REEMBOLSOS', text: 'Reembolsos'},
//                            {value: 'ACREDITACIONES', text: 'Acreditaciones'},
//                            {value: 'CONTRACARGO', text: 'Contracargo'},
//                            {value: 'CARGA',text:'Carga'}
//                        ]
//                    },
//                    listeners: {
//                        change: 'btnSearch_click'
//                    }
//}

                
                
                
                
                //aqui agregamos mas filtrso
            ]
        }
    ]
});




