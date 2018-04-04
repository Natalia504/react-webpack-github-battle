var React = require('react');

class Popular extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLanguage: 'All',
        }
        this.updateLanguage = this.updateLanguage.bind(this);
    }
    updateLanguage(lang) {
        this.setState({
            selectedLanguage: lang
        })
    }
    render() {
        var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

        return (
            <ul className='languages'>
                {languages.map(function (lang) {
                    return (
                        <li
                            style={lang === this.state.selectedLanguage ? {color: 'red'} : null }
                            key={lang}
                            onClick={this.updateLanguage.bind(null, lang)}>
                            {lang}
                        </li>
                    )
                }, this)
                }
            </ul>
        )
    }
};

module.exports = Popular;