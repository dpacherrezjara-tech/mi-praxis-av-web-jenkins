/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

var years = [];
var currentYear = new Date().getFullYear();

for (var i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push({
        value: i.toString(),
        text: i.toString()
    });
}
Ext.define('Ext.Praxis.view.payments.CintaValidationForm.Filters', {
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

                {xtype: 'tbspacer', width: 40},

                {
                    xtype: 'combo',
                    fieldLabel: 'From',
                    id: prototype.id + '-cmbYearFrom',
                    name: 'YEAR_FROM',
                    labelWidth: 35, // más pequeño = acerca el combo al label
                    width: 110,
                    editable: false,
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'value',
                    value: new Date().getFullYear().toString(),
                    store: Ext.create('Ext.data.Store', {
                        fields: ['value', 'text'],
                        data: years
                    })

                },

                // {xtype: 'tbspacer', width: 60},

                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbMonthFrom',
                    name: 'MONTH_FROM',
                    width: 70,
                    editable: false,
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'value',
                    value: Ext.String.leftPad((new Date().getMonth() + 1), 2, '0'),
                    store: Ext.create('Ext.data.Store', {
                        fields: ['value', 'text'],
                        data: [
                            {value: '01', text: 'Jan'},
                            {value: '02', text: 'Feb'},
                            {value: '03', text: 'Mar'},
                            {value: '04', text: 'Apr'},
                            {value: '05', text: 'May'},
                            {value: '06', text: 'Jun'},
                            {value: '07', text: 'Jul'},
                            {value: '08', text: 'Aug'},
                            {value: '09', text: 'Sep'},
                            {value: '10', text: 'Oct'},
                            {value: '11', text: 'Nov'},
                            {value: '12', text: 'Dec'}
                        ]
                    })
                },

                {xtype: 'tbspacer', width: 40},

                {
                    xtype: 'combo',
                    fieldLabel: 'To',
                    id: prototype.id + '-cmbYearTo',
                    name: 'YEAR_TO',
                     labelWidth: 35, // más pequeño = acerca el combo al label
                    width: 110,
                    editable: false,
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'value',
                    value: new Date().getFullYear().toString(),
                    store: Ext.create('Ext.data.Store', {
                        fields: ['value', 'text'],
                        data: years
                    })

                },

                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbMonthTo',
                    name: 'MONTH_TO',
                    width: 70,
                    editable: false,
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'value',
                    value: Ext.String.leftPad((new Date().getMonth() + 1), 2, '0'),
                    store: Ext.create('Ext.data.Store', {
                        fields: ['value', 'text'],
                        data: [
                            {value: '01', text: 'Jan'},
                            {value: '02', text: 'Feb'},
                            {value: '03', text: 'Mar'},
                            {value: '04', text: 'Apr'},
                            {value: '05', text: 'May'},
                            {value: '06', text: 'Jun'},
                            {value: '07', text: 'Jul'},
                            {value: '08', text: 'Aug'},
                            {value: '09', text: 'Sep'},
                            {value: '10', text: 'Oct'},
                            {value: '11', text: 'Nov'},
                            {value: '12', text: 'Dec'}
                        ]
                    })
                }





            ]
        }
    ]
});




