class NotesController < ApplicationController
  def index
    @notes = Note.paginate page: params[:page],
      per_page: Settings.notes.notes_per_page
  end
end
