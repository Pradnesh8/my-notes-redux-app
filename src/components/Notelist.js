import Note from "./Note"
import PropTypes from 'prop-types'

const Notelist = ({ Notes, onDelete, onEdit }) => {
    return (
        <div className="notes-deck">
            {
                (Notes).map((note) => (
                    <Note key={note.id} Note={note} onDelete={onDelete} onEdit={onEdit} />
                ))
            }
        </div>
    )
}

Notelist.propTypes = {
    Notes: PropTypes.array.isRequired,
}

export default Notelist
