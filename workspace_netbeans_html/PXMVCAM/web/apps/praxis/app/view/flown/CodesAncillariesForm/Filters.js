Ext.define('Ext.Praxis.view.flown.CodesAncillariesForm.Filters', {
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
                anchor: '100%',
                padding: '5 1'
            },
            items: [
                { xtype: 'tbspacer', width: 20 },
                {
                    xtype: 'label',
                    text: 'Effective Date:',
                    style: 'text-align:left;font-weight:bold;',
                    padding: '8 0'
                },
                { xtype: 'tbspacer', width: 20 },
                {
                    xtype: 'datefield',
                    id: prototype.id+'-txtEffective',
                    format: 'Y/m/d',
                    formatText: '',
                    invalidText: 'Type the date in the format: YYYY/MM/DD',
                    minValue: new Date(1990, 00, 01),
                    maxValue : new Date(),
                    maskRe: /[0-9/]/,
                    fieldStyle: 'text-align:center;color:blue;',
                    editable: true,
                    enforceMaxLength: true,
                    maxLength: 10,
                    width: 90,
                    autoEl: {
                        tag: 'label',
                        'data-qtip': 'Format valid YYYY/MM/DD'
                    },
                    value: new Date()
                }
            ]
        }
    ]
});

