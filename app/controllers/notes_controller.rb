class NotesController < ApplicationController
  def index
    respond_to do |format|
      format.html do
        @statuses = Note.statuses.keys
      end

      format.json do
        @notes = Note.order_desc(:created_at).paginate page: params[:page],
          per_page: Settings.notes.notes_per_page
        render json: {notes: @notes, total_pages: @notes.total_pages}
      end
    end
  end

  def create
    @note = Note.new note_params
    if @note.save
      render json: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  private
  def note_params
    params.require(:note).permit :title, :time, :content, :status
  end
end
